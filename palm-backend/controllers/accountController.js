const Account = require("../models/account");
const hashPassword = require("../utils/common.utils");

// Display all accounts
const account_index = async (req, res) => {
    await Account.find()
        .then((accounts) => {
            var totalCount;
            totalCount = accounts.length;
            res.json({accounts, totalCount});
        })
        .catch((err) => {
            console.log(err);
        })
}

// Create new account
const account_create = async (req, res) => {
    let account = await new Account(req.body);
    await account
        .save()
        .then((account) => {
            res.send(account);
        })
        .catch((err) => {
            console.log(err);
            res.status(422).send("Account creation failed!");
        });
}

// Update existing account
const account_update = async (req, res) => {
    await Account.findByIdAndUpdate(req.params.id, req.body)
        .then((account) => {
            res.json("Account updated");
        })
        .catch((err) => {
            res.status(422).send("Account update failed!");
        });
}

// Find one account with ID
const account_getOne = async (req, res) => {
    Account.findById(req.params.id)
        .then((account) => {
            if (!account) {
                res.status(404).send("Account not found");
            } else {
                res.send(account);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

// Delete account by ID
const account_delete = (req, res) => {
    Account.findById(req.params.id)
        .then(async (account) => {
            if (!account) {
                res.status(404).send("Account not found");
            } else {
                await Account.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.status(200).json("Account deleted.");
                    })
                    .catch((err) => {
                        res.status(400).send("Account delete failed.");
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    account_index,
    account_create,
    account_update,
    account_getOne,
    account_delete,
}