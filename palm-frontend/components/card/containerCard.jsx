import Link from "next/link";
import Card from "../card";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const ContainerCard = (props) => {
    const { title, data } = props;
    let newDataTemp = [];
    if ('accounts' === title) {
        newDataTemp = [...data].sort((a, b) => a.accountBalance - b.accountBalance).reverse();
    } else {
        newDataTemp = [...data].sort((a, b) => a.bucketGoal - b.bucketGoal).reverse();
    }
    const [newData, setNewData] = useState(newDataTemp);
    const router = useRouter();

    useEffect(() => {
        if ('accounts' === title) {
            const sortedAccounts = [...data].sort((a, b) => a.accountBalance - b.accountBalance).reverse();
            setNewData(sortedAccounts);
        } else {
            const sortedBuckets = [...data].sort((a, b) => a.bucketGoal - b.bucketGoal).reverse();
            setNewData(sortedBuckets);
        }
    }, [router, data]);

    useEffect(() => {
        console.log('data', data);
        console.log('new', newData);
        console.log(title);
    }, [])

    return (
        <Card extra="!p-[20px]">
            <div className="flex items-center justify-between">
                {title && <h3 className="text-xl font-bold text-black capitalize">{title}</h3>}

                {/* <Link
                    href={`/${title}`}
                >
                    <span className="text-black text-3xl font-medium hover:cursor-pointer">+</span>
                </Link> */}
            </div>
            {
                newData.length > 0 ? (
                    <div className="flex flex-col">
                        {
                            newData.slice(0, 2).map((item, index) => (
                                <div className="flex items-center justify-between mt-4" key={index}>
                                    <h3 className="text-2xl text-black font-medium">{title === 'accounts' ? item.accountName : item.bucketName}</h3>

                                    <h3 className="text-2xl text-black font-light">{title === 'accounts' ? item.accountBalance : item.accounts.map((account) => (account.inputValue)).reduce((acc, cur) => acc + cur, 0)}</h3>
                                </div>
                            ))
                        }
                        <div className="flex justify-center items-center">
                            <Link
                                href={`/${title}`}
                            >
                                <span className="text-3xl font-bold text-black hover:cursor-pointer">
                                    ...
                                </span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <div className="mb-8">
                            <Link
                                href={`/${title}`}
                            >
                                <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-[#002254] px-5 py-2 transition duration-200 hover:cursor-pointer">
                                    {title && <span className="text-sm font-medium">Add {title}</span>}
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            }
        </Card>
    );
}

export default ContainerCard;
