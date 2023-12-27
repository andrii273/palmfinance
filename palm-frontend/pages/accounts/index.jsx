import AccountCard from "@/components/card/accountCard";
import AvenueCard from "@/components/card/avenueCard";
import Card from "../../components/card";
import { useEffect, useState } from "react";
import { instance } from "@/helpers/axios";
import { useRouter } from "next/router";
import EditAccountForm from "@/components/forms/editAccount";
import CreateAccountForm from "@/components/forms/createAccount";

const Accounts = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [accounts, setAccounts] = useState([]);
    const countPerPage = 10;
    const [id, setId] = useState(null);
    const [data, setData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isEditForm, setIsEditForm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);

    let overallBalance = 0,
        assets = 0,
        liabilities = 0;

    accounts.map((account, index) => {
        if (account.accountBalance >= 0) {
            assets = assets + account.accountBalance;
        } else {
            liabilities = liabilities + account.accountBalance;
        }

        overallBalance = assets + liabilities;
    })

    useEffect(() => {
        instance.get('/accounts/')
            .then((res) => {
                setAccounts(res.data.accounts);
            }).catch(error => {
                console.log(error.message);
            });

    }, [router]);

    const prevHandler = () => {
        setPage(page - 1);
    }

    const nextHandler = () => {
        setPage(parseInt(page) + 1);
    }

    const handleEditModalClick = async (id) => {
        setId(id);
        await instance.get(`/accounts/${id}`)
            .then((res) => {
                setData({
                    accountName: res.data.accountName,
                    accountBalance: res.data.accountBalance,
                    accountModifiedAt: res.data.accountModifiedAt,
                });
            }).catch(error => {
                console.log(error.message);
            });

        setIsEditForm(true);
        setShowModal(true);
    }

    const handleMessage = () => {
        setIsDeleteClicked(false);
        setShowMessage(true);
    }

    const handleMessageCancel = () => {
        setShowMessage(false);
    }

    const handleModalCancel = () => {
        setShowModal(false);
    }

    const handleDeleteMessageClicked = () => {

        setIsDeleteClicked(true);

        setShowModal(true);

        setShowMessage(true);
    }

    const handleDeleteMessage = () => {
        instance.delete(`/accounts/${id}`)
            .then((res) => {
                router.push('/accounts');
                handleAllCancel();
            }).catch(error => {
                console.log(error.message);
            })
    }

    const handleCreateModalClick = () => {
        setIsEditForm(false);
        setShowModal(true);
        setShowMessage(false);
    }

    const handleAllCancel = () => {
        setShowMessage(false);
        setShowModal(false);
    }

    return (
        <>
            <div className="h-full relative">
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <AvenueCard title='Overall Balance' value={overallBalance} />
                    <AvenueCard title='Assets' value={assets} />
                    <AvenueCard title='Liabilities' value={liabilities} />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {
                        accounts.map((account, index) => (
                            <div
                                className="hover:cursor-pointer"
                                onClick={() => handleEditModalClick(account._id)}
                                key={index}
                            >
                                <AccountCard
                                    title={account.accountName}
                                    balance={account.accountBalance}
                                    time={account.accountModifiedAt}
                                />
                            </div>
                        ))
                    }
                    <div
                        className="hover:cursor-pointer"
                        onClick={() => handleCreateModalClick()}
                    >
                        <Card extra="!p-[20px] border-black items-center h-full">
                            <div className="flex justify-center items-center h-full text-black text-3xl font-medium">
                                +
                            </div>
                        </Card>
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
                            {
                                isEditForm ?
                                    (<EditAccountForm data={data} id={id} handleMessage={handleMessage} handleModalCancel={handleModalCancel} handleDeleteMessageClicked={handleDeleteMessageClicked} />)
                                    : (<CreateAccountForm handleMessage={handleMessage} handleModalCancel={handleModalCancel} />)
                            }

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
                                            {isDeleteClicked ? (<p className="font-medium text-black">
                                                Are you sure you want to delete account?
                                                <br />
                                                All assigned account values will be removed from buckets.
                                            </p>) : (<p className="font-medium text-black">
                                                Are you sure you want to cancel?
                                                <br />
                                                Any unsaved progress will be lost.
                                            </p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center">
                                {isDeleteClicked ? (<button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDeleteMessage}
                                >
                                    I am Sure
                                </button>) : (<button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-sm border border-[#989898] shadow-sm px-4 py-2 bg-[#F9AC17] text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleAllCancel}
                                >
                                    I am Sure
                                </button>)}
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
}

export default Accounts;