import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { instance } from "@/helpers/axios";
import { useState, useEffect } from "react";
import * as cn from "classnames";
import { set } from "react-hook-form";

const EditBucketForm = (props) => {
  const {
    singleBucket,
    id,
    accounts,
    available,
    buckets,
    handleMessage,
    handleModalCancel,
    handleDeleteMessageClicked,
    accountAvailables,
    isEntireState
  } = props;

  const [avail, setAvail] = useState(available);
  const [tempaccounts, setTempaccounts] = useState(accounts);
  const router = useRouter();

  const [newAccounts, setNewAccounts] = useState([]);
  useEffect(() => {

    console.log("first", tempaccounts);
  }, [tempaccounts])

  useEffect(() => {
    const updatedAccounts = accounts.map(account => {
      const matchingAccount = singleBucket.accounts.find(dataAccount => dataAccount._id === account._id);

      if (matchingAccount) {
        if (matchingAccount.isEntire) matchingAccount.inputValue = matchingAccount.accountBalance;
        return {
          ...account,
          // Update the fields you want to update
          isOpen: matchingAccount.isOpen,
          isEntire: matchingAccount.isEntire,
          inputValue: matchingAccount.inputValue
        };
      }
      if (account.isEntire) account.inputValue = account.accountBalance;

      return account;
    });

    setNewAccounts(updatedAccounts);
    setTempaccounts(updatedAccounts);
    console.log('accounts', accounts);
    console.log('available', available);
  }, [accounts]);

  const formik = useFormik({
    initialValues: {
      bucketName: singleBucket.bucketName,
      bucketGoal: singleBucket.bucketGoal,
      accounts: newAccounts,
    },
    validationSchema: Yup.object({
      bucketName: Yup.string().required("Bucket name is required"),
      bucketGoal: Yup.number()
        .typeError("Goal must be a number")
        .required("Goal is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      let newbuckets = buckets;
      const formData = new FormData();
      const today = new Date(),
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
      const updatedAccounts = tempaccounts.map((account) => {
        if (account.inputValue) return account;
        else return { ...account, isOpen: false };
      });
      newbuckets[newbuckets.findIndex((one) => (one._id == id))].accounts = updatedAccounts;

      formData.append("bucketName", values.bucketName);
      formData.append("bucketGoal", values.bucketGoal);
      formData.append("bucketModifiedAt", date);
      formData.append("accounts", JSON.stringify(updatedAccounts));
      console.log(values);
      try {
        await updateBucket(formData, id);
        handleModalCancel();
      } catch (error) {
        console.log(error.message);
      } finally {
        setSubmitting(false);
      }

      tempaccounts.map((temp) => {
        if (temp.isEntire) {
          newbuckets = newbuckets.map((newbucket) => {
            return {
              ...newbucket, accounts: newbucket.accounts.map((one) => {
                if (one.accountName == temp.accountName) {
                  one.inputValue = 0;
                  one.isOpen = false;
                }
                return one;
              })
            }
          })
        }
      })
      console.log('newbuckets', newbuckets);

      for (let i = 0; i < newbuckets.length; i++) {
        const newbucket = newbuckets[i];
        if (newbucket._id == id) continue;
        const formData = new FormData();
        const today = new Date(),
          date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

        formData.append("bucketName", newbucket.bucketName);
        formData.append("bucketGoal", newbucket.bucketGoal);
        formData.append("bucketModifiedAt", date);
        formData.append("accounts", JSON.stringify(newbucket.accounts));

        try {
          await updateBucket(formData, newbucket._id);
          handleModalCancel();
        } catch (error) {
          console.log(error.message);
        } finally {
          setSubmitting(false);
        }
      }


    },
  });

  const updateBucket = async (data, index) => {
    instance
      .put(`/buckets/${index}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        router.push("/buckets");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleAccountSelect = (e, accountId) => {
    const isChecked = e.target.checked;
    setTempaccounts(
      tempaccounts.map((account) => {
        if (account._id === accountId) {
          let updatedAccount = {};
          if (isChecked) { updatedAccount = { ...account, isOpen: isChecked } }
          else {
            updatedAccount = { ...account, isOpen: isChecked, inputValue: 0 };
          };

          return updatedAccount;
        }
        return account;
      })
    );
  };

  const handleInputChange = (e, accountId) => {
    const value = e.target.value == '' ? 0 : parseInt(e.target.value);
    console.log(parseInt(e.target.value));
    setTempaccounts(
      tempaccounts.map((account) => {
        if (account._id === accountId) {
          if (account.isEntire) {
            return { ...account, inputValue: account.accountBalance };
          } else {
            return { ...account, inputValue: value };
          }
        }
        return account;
      })
    );
  };

  const handleEntireBalance = (e, accountId) => {
    const isChecked = e.target.checked;
    setTempaccounts(
      tempaccounts.map((account) => {
        if (account._id === accountId) {
          const updatedAccount = isChecked
            ? {
              ...account,
              isEntire: isChecked,
              inputValue: account.accountBalance,
            }
            : { ...account, isEntire: isChecked, inputValue: 0 };
          // setIsEntireState(isChecked);

          return updatedAccount;
        }
        return account;
      })
    );
  };


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-4 pt-4 pb-4 sm:p-6 border-y">
          <div className="w-full">
            <div className="mt-3 sm:mt-0">
              <div className="flex justify-between items-center">
                <h3
                  className="text-lg leading-6 font-medium text-black"
                  id="modal-title"
                >
                  Update Buckets
                </h3>

                <h4
                  className="text-md text-red-500 underline hover:cursor-pointer"
                  onClick={handleDeleteMessageClicked}
                >
                  Delete Bucket
                </h4>
              </div>
              <div className="mt-2 text-black">
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium ">
                    Name
                  </label>
                  <input
                    type="text"
                    name="bucketName"
                    id="bucketName"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                    value={formik.values.bucketName}
                    placeholder={formik.values.bucketName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.bucketName && formik.errors.bucketName ? (
                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">
                      {formik.errors.bucketName}
                    </div>
                  ) : null}
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm font-medium">Goal</label>
                  <div className="relative">
                    <span className="absolute left-[6px] top-[9px]">$</span>
                    <input
                      type="number"
                      name="bucketGoal"
                      id="bucketGoal"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                      value={formik.values.bucketGoal}
                      placeholder={formik.values.bucketGoal}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                  </div>
                  {formik.touched.bucketGoal && formik.errors.bucketGoal ? (
                    <div className="text-red-500 text-xs mt-1 ml-1.5 font-medium">
                      {formik.errors.bucketGoal}
                    </div>
                  ) : null}
                </div>

                <div className="w-full mt-4">
                  <label className="block mb-2 text-sm font-medium">
                    Amount
                  </label>
                  <div className="max-h-[200px] overflow-auto custom-scroller">
                    {tempaccounts.map((account) => (
                      <div
                        className="border border-[#e5e7eb] rounded mt-4 p-4"
                        key={`account-${account._id}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="">
                            <h4 className="text-sm text-black font-medium">
                              {account.accountName}
                            </h4>
                            <p className="text-xs text-black mt-2">
                              $
                              {
                                avail[avail.findIndex((temp) => (temp.accountName == account.accountName))].value
                              }{" "}
                              available
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value={account._id}
                              checked={account.isOpen}
                              disabled={avail[avail.findIndex((temp) => (temp.accountName == account.accountName))].value == 0 && account.inputValue == 0}
                              className="sr-only peer"
                              onChange={(e) => {
                                handleAccountSelect(e, account._id);
                                let tempavail = avail;
                                setAvail(
                                  tempavail.map((temp) => {
                                    if (temp.accountName == account.accountName) {
                                      const newAccountName = account.accountName;
                                      const q = available.findIndex((onetemp) => (onetemp.accountName == temp.accountName))
                                      const newValue = parseInt(avail[q].value) + (e.target.checked ? 0 : parseInt(tempaccounts[q].inputValue));
                                      return { accountName: newAccountName, value: newValue }
                                    }
                                    else return temp;
                                  })
                                )
                              }
                              }
                            />
                            <div className="w-11 h-6 bg-[#B0B0B0] peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F9AC17]"></div>
                            <span className="ml-3 text-sm font-medium text-black hidden"></span>
                          </label>
                        </div>

                        {account.isOpen && (
                          <div className="mt-4">
                            <div className="relative">
                              <span className="absolute left-[6px] top-[9px]">
                                $
                              </span>
                              <input
                                type="number"
                                className={
                                  account.isEntire
                                    ? "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-gray-300 text-gray-700 cursor-not-allowed pointer-events-none"
                                    : "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white"
                                }
                                value={
                                  account.isEntire
                                    ? account.accountBalance
                                    : account.inputValue != 0 ? parseInt(account.inputValue) : ''
                                }
                                onChange={(e) => {
                                  const p = available.findIndex((onetemp) => (onetemp.accountName == account.accountName));
                                  if (parseInt(e.target.value) > available[p].value + newAccounts[p].inputValue)
                                    return;
                                  handleInputChange(e, account._id);

                                  let tempavail = avail;
                                  setAvail(
                                    tempavail.map((temp) => {
                                      if (temp.accountName == account.accountName) {
                                        const newAccountName = account.accountName;
                                        const q = available.findIndex((onetemp) => (onetemp.accountName == temp.accountName))
                                        const newValue = parseInt(available[q].value) + parseInt(newAccounts[q].inputValue) - parseInt(e.target.value == '' ? 0 : e.target.value);
                                        return { accountName: newAccountName, value: newValue }
                                      }
                                      else return temp;
                                    })
                                  )
                                }
                                }
                                disabled={isEntireState}
                              />
                            </div>

                            <div className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                value={account._id}
                                checked={account.isEntire}
                                disabled={avail[avail.findIndex((temp) => (temp.accountName == account.accountName))].value == 0 && !account.isEntire}
                                className="checkbox border border-[#e5e7eb]"
                                onChange={(e) => {
                                  handleEntireBalance(e, account._id);
                                  if (e.target.checked) {
                                    let tempavail = avail;
                                    setAvail(
                                      tempavail.map((temp) => {
                                        if (temp.accountName == account.accountName) {
                                          const newAccountName = account.accountName;
                                          const q = available.findIndex((onetemp) => (onetemp.accountName == temp.accountName))
                                          const newValue = parseInt(available[q].value) + parseInt(accounts[q].inputValue) - parseInt(account.accountBalance);
                                          return { accountName: newAccountName, value: 0 }
                                        }
                                        else return temp;
                                      })
                                    )
                                  } else {
                                    let tempavail = avail;
                                    setAvail(
                                      tempavail.map((temp) => {
                                        if (temp.accountName == account.accountName) {
                                          const newAccountName = account.accountName;
                                          const q = available.findIndex((onetemp) => (onetemp.accountName == temp.accountName))
                                          const newValue = parseInt(available[q].value) + parseInt(newAccounts[q].inputValue);
                                          return { accountName: newAccountName, value: newValue }
                                        }
                                        else return temp;
                                      })
                                    )
                                  }
                                }
                                }
                              />
                              <span className="ml-3 text-sm font-medium text-black">
                                Always use the entire account balance
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 sm:px-6 sm:flex sm:justify-between">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-white text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm"
            onClick={handleMessage}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-3 w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBucketForm;
