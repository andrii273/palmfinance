import AvenueCard from "@/components/card/avenueCard";
import BucketCard from "@/components/card/bucketCard";
import CreateBucketForm from "@/components/forms/createBucket";
import EditBucketForm from "@/components/forms/editBucket";
import { instance } from "@/helpers/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Buckets = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [id, setId] = useState(null);
  const [singleBucket, setSingleBucket] = useState([]);
  const [isEntireState, setIsEntireState] = useState(false);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    instance
      .get("/buckets")
      .then((res) => {
        setBuckets(res.data.bucketData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  useEffect(() => {
    instance
      .get("/accounts")
      .then((res) => {
        const modifiedAccounts = res.data.accounts
          .map((account) => {
            const usedInBuckets = buckets.filter((bucket) => {
              return bucket.accounts.some((bucketAccount) => {
                return bucketAccount._id.toString() === account._id.toString();
              });
            });

            if (usedInBuckets.length === 0) {
              // Unused account
              return {
                ...account,
                accountAvailable: account.accountBalance,
                isOpen: false,
                isEntire: false,
                inputValue: 0,
              };
            } else {
              // Used account
              const { isOpen, isEntire, inputValue } =
                usedInBuckets[0].accounts.find((bucketAccount) => {
                  return (
                    bucketAccount._id.toString() === account._id.toString()
                  );
                });

              return {
                ...account,
                isOpen: false,
                isEntire,
                inputValue: 0,
              };
            }
          })
          .filter((account) => {
            return account.accountBalance >= 0;
          });

        setAccounts(modifiedAccounts);

        console.log('modifiedAccounts', modifiedAccounts);
        console.log('buckets', buckets);
        let temp = [];
        modifiedAccounts.map((account) => {
          temp.push({ accountName: account.accountName, value: account.accountBalance });
        })
        buckets.map((bucket) => {
          bucket.accounts.map((account) => {
            for (let i = 0; i < temp.length; i++) {
              if (temp[i].accountName == account.accountName) {
                if (account.isEntire) temp[i].value = 0;
                else temp[i].value -= account.inputValue;
              }
            }
          })
        })
        setAvailable(temp);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [buckets]);


  let totalGoal = 0,
    assets = 0,
    liabilities = 0,
    overallAssets = 0,
    bucketBalance = 0,
    difference = 0;

  accounts.map((account, index) => {
    if (account.accountBalance >= 0) {
      assets += account.accountBalance;
    } else {
      liabilities += account.accountBalance;
    }

    overallAssets = assets + liabilities;
  });

  buckets.map((bucket, index) => {
    totalGoal += bucket.bucketGoal;
    bucket.accounts &&
      bucket.accounts.map((account) => {
        bucketBalance += account.inputValue;
      });
  });

  difference = overallAssets - bucketBalance;

  const handleCreateModalClick = () => {
    setShowModal(true);
    setIsEditForm(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleMessage = () => {
    setIsDeleteClicked(false);
    setShowMessage(true);
  };

  const handleMessageCancel = () => {
    setShowMessage(false);
  };

  const handleAllCancel = () => {
    setShowMessage(false);
    setShowModal(false);
  };

  const handleEditModalClick = async (id) => {
    setId(id);

    setSingleBucket(buckets.find((bucket) => bucket._id === id));

    setIsEditForm(true);
    setShowModal(true);
  };

  const handleDeleteMessageClicked = () => {
    setIsDeleteClicked(true);

    setShowModal(true);

    setShowMessage(true);
  };

  const handleDeleteMessage = () => {
    instance
      .delete(`/buckets/${id}`)
      .then((res) => {
        router.push("/buckets");
        handleAllCancel();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAccountSelect = (e, accountId) => {
    const isChecked = e.target.checked;
    setAccounts(
      accounts.map((account) => {
        if (account._id === accountId) {
          const updatedAccount = { ...account, isOpen: isChecked };

          return updatedAccount;
        }
        return account;
      })
    );
  };

  const refreshBuckets = () => {
    instance
      .get("/buckets")
      .then((res) => {
        setBuckets(res.data.bucketData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEntireBalance = (e, accountId) => {
    const isChecked = e.target.checked;
    setAccounts(
      accounts.map((account) => {
        if (account._id === accountId) {
          const updatedAccount = isChecked
            ? {
              ...account,
              isEntire: isChecked,
              inputValue: account.accountBalance,
            }
            : { ...account, isEntire: isChecked, inputValue: 0 };
          setIsEntireState(isChecked);

          return updatedAccount;
        }
        return account;
      })
    );
  };

  return (
    <>
      <div className="h-full relative">
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <AvenueCard title="Assets" value={overallAssets} />
          <AvenueCard title="Buckets Balance" value={bucketBalance} />
          <AvenueCard title="Difference" value={difference} />
          <AvenueCard title="Total Goals Amount" value={totalGoal} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-4">
          {buckets &&
            buckets.map((bucket) => (
              <div
                className="hover:cursor-pointer"
                onClick={() => handleEditModalClick(bucket._id)}
                key={bucket._id}
              >
                <BucketCard
                  title={bucket.bucketName}
                  goal={bucket.bucketGoal}
                  accounts={bucket.accounts}
                  empty={false}
                />
              </div>
            ))}

          <div
            className="hover:cursor-pointer"
            onClick={() => handleCreateModalClick()}
          >
            <BucketCard empty={true} />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50">
          <div className="min-h-screen pt-4 px-4 pb-20 text-center block p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-[#48484880] opacity-50"></div>
            </div>
            <span className="inline-block align-middle h-screen "></span>&#8203;
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
              {isEditForm ? (
                <EditBucketForm
                  singleBucket={singleBucket}
                  id={id}
                  accounts={accounts}
                  available={available}
                  buckets={buckets}
                  handleMessage={handleMessage}
                  handleModalCancel={handleModalCancel}
                  handleDeleteMessageClicked={handleDeleteMessageClicked}
                  handleAccountSelect={handleAccountSelect}
                  refreshBuckets={refreshBuckets}
                  handleEntireBalance={handleEntireBalance}
                  isEntireState={isEntireState}
                />
              ) : (
                <CreateBucketForm
                  handleMessage={handleMessage}
                  handleModalCancel={handleModalCancel}
                  accounts={accounts}
                  available={available}
                  buckets={buckets}
                  handleAccountSelect={handleAccountSelect}
                  refreshBuckets={refreshBuckets}
                  handleEntireBalance={handleEntireBalance}
                  isEntireState={isEntireState}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed inset-0 z-50">
          <div className="min-h-screen pt-4 px-4 pb-20 text-center block p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-[#48484880] opacity-50"></div>
            </div>
            <span className="inline-block align-middle h-screen"></span>&#8203;
            <div className="p-6 inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
              <div className="px-4 pt-4">
                <div className="w-full">
                  <div className="mt-3 text-center sm:mt-0">
                    <div className="flex justify-center items-center">
                      {isDeleteClicked ? (
                        <p className="font-medium text-black">
                          Are you sure you want to delete account?
                          <br />
                          All assigned account values will be removed from
                          buckets.
                        </p>
                      ) : (
                        <p className="font-medium text-black">
                          Are you sure you want to cancel?
                          <br />
                          Any unsaved progress will be lost.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center">
                {isDeleteClicked ? (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDeleteMessage}
                  >
                    I@apos;m Sure
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAllCancel}
                  >
                    I@apos;m Sure
                  </button>
                )}
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-white text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleMessageCancel}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Buckets;
