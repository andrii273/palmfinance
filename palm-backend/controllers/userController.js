const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/common.utils");
const nodemailer = require('nodemailer');

// Get all users
const user_index = async (req, res) => {
    await User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        })
}

// Login
const user_login = (req, res) => {
    // let email = req.body.email;
    // res.send(`Email: ${email}`);
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (!user) {
                res.status(404).send("This email doesn't exist!");
            } else {
                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if (!isMatch) {
                    res.status(401).send("The password is wrong!");
                } else {
                    const payload = {
                        user: {
                            id: user._id,
                        }
                    };
    
                    jwt.sign(
                        payload,
                        'secret',
                        (err, token) => {
                            if (err) throw err;
                            let options = {
                                path: "/",
                                sameSite: true,
                                maxAge: 1000 * 60 * 60 * 24, // expired after 24 hours
                                httpOnly: false, // cookie is only acessible by the web server
                            }
    
                            res.cookie('token', token, options);
                            res.send({ type: "success", message: "Successful", token, id: user._id });
                        }
                    );
                }
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        })
};

// Create new user
const user_create = async (req, res) => {

    var flag = false;
    await User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.send('The email is already in use.');
                flag = true;
            }
        });

        if (!flag) {
            await hashPassword(req);

            let user = await new User(req.body);

            await user
                .save()
                .then((user) => {
                    res.send(user);
                })
                .catch(function (err) {
                    res.status(422).send("user add failed");
                });
        }
}

// Reset password
const reset_password = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                const payload = {
                    user: {
                        id: user._id,
                        email: user.email,
                        password: user.password
                    }
                }

                jwt.sign(payload, 'secret', (err, token) => {
                    if (err) throw err;
                    sendResetPasswordEmail(user.email, token);
                });

            } else {
                throw new Error('User not found');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ msg: "Internal server error"})
        });
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
});

const sendResetPasswordEmail = (email, token) => {
    const resetPasswordLink = `http://127.0.0.1:3000/auth/reset/${token}`;
    const mailOptions = {
        from: 'dudektymon3@gmail.com',
        to: email,
        subject: 'Nodemailer Project',
        html: `Click <a href="${resetPasswordLink}">here</a> to reset your password.`
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("I am here", err);
        } else {
            console.log("Email sent successfully");
        }
    });
}

// Verify email
const verify_email = async (req, res) => {
    const token = req.body.token;
    try {
        payload = await jwt.verify(token, 'secret');
        return res.send(payload.user.email);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end();
        }
        // otherwise, return a bad request error
		return res.status(400).end();
    }
}

// Update password
const update_password = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (user) {
                password = await bcrypt.hash(req.body.password, 8);
                user.password = password;
                await user
                    .save()
                    .then((user) => {
                        res.send(user);
                    })
                    .catch(function (err) {
                        res.status(422).send("Password update failed")
                    })
            } else {
                throw new Error('User not found');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ msg: "Internal server error"})
        });
}

module.exports = {
    user_index,
    user_login,
    user_create,
    reset_password,
    verify_email,
    update_password,
};