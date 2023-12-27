const User = require("../models/user");
const nodemailer = require('nodemailer');

const user_index = async (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).send("This User doesn't exist!");
            } else {
                res.send(user);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

const profile_update = async (req, res) => {
    var flag = false;

    await User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.send('The email is already in use.');
                flag = true;
            }
        })
        .catch((err) => {
            console.log(err);
        })

    if (!flag) {
        User.findOne({ _id: req.params.id })
            .then(async (user) => {
                if (user) {
                    user.name = req.body.name;
                    user.email = req.body.email;

                    await user
                        .save()
                        .then((user) => {
                            res.send(user);
                        })
                        .catch((err) => {
                            res.status(422).send("User update failed");
                        });
                } else {
                    res.status(404).send("User not found");
                }
            })
    }
}

const contact_form = async (req, res) => {
    res.send(req.body);
    const mailOptions = {
        from: req.body.email,
        to: process.env.MAIL_USERNAME,
        subject: 'Palm feedback',
        html: req.body.message,
    }

    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            console.log("Email sending failed", err);
        } else {
            console.log("Email sent successfully");
        }
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

module.exports = {
    user_index,
    profile_update,
    contact_form,
}