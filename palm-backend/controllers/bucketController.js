const Account = require("../models/account");
const Bucket = require("../models/bucket");

// Display all buckets
const bucket_index = async (req, res) => {
  await Bucket.find()
    .populate({
      path: "accounts.account",
      select: "accountName accountBalance",
      model: "Account",
    })
    .then(async (buckets) => {
      const bucketData = await Promise.all(
        buckets.map(async (bucket) => {
          const associatedAccounts = await Promise.all(
            bucket.accounts.map(async (accountObj) => {
              const account = await Account.findById(accountObj._id);
              if (account) {
                return {
                  ...accountObj.toObject(),
                  accountName: account.accountName,
                  accountBalance: account.accountBalance,
                };
              } else {
                return {
                  ...accountObj.toObject(),
                  accountName: null,
                  accountBalance: null,
                };
              }
            })
          );
          return { ...bucket.toObject(), accounts: associatedAccounts };
        })
      );
      res.json({bucketData});
    })
    .catch((err) => {
      console.log(err);
    });
};

// Create a bucket
const bucket_create = async (req, res) => {
  try {
    const { bucketName, bucketGoal, accounts } = req.body;

    // Create new bucket
    const bucket = new Bucket({
      bucketName,
      bucketGoal,
      accounts: JSON.parse(accounts),
    });

    // Save bucket to the database
    await bucket.save();

    res.json({ message: "Bucket created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update existing bucket
const bucket_update = async (req, res) => {
  const { bucketName, bucketGoal, accounts } = req.body;

  // Create new bucket
  const updatedBucket = {
    bucketName,
    bucketGoal,
    accounts: JSON.parse(accounts),
  };

  await Bucket.findByIdAndUpdate(req.params.id, updatedBucket)
    .then((bucket) => {
      res.json("Bucket updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send("Bucket update failed!");
    });
};

// Find one bucket with ID
const bucket_getOne = async (req, res) => {
  Bucket.findById(req.params.id)
    .then((bucket) => {
      if (!bucket) {
        res.status(404).send("Bucket not found");
      } else {
        res.send(bucket);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete bucket by ID
const bucket_delete = (req, res) => {
  Bucket.findById(req.params.id)
    .then(async (bucket) => {
      if (!bucket) {
        res.status(404).send("Bucket not found");
      } else {
        await Bucket.findByIdAndDelete(req.params.id)
          .then(() => {
            res.status(200).json("Bucket deleted.");
          })
          .catch((err) => {
            res.status(400).send("Bucket delete failed.");
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  bucket_index,
  bucket_create,
  bucket_update,
  bucket_getOne,
  bucket_delete,
};
