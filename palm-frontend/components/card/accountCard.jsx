import { formattedNumber } from "@/utils/common";
import Card from "../card";
import { useEffect, useState } from "react";

const AccountCard = (props) => {
    const { title, time } = props;
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        let temp = props.balance;
        setBalance(temp);
        console.log('props', props);
    }, [props])

    return (
        <Card extra="!p-[20px] border-black">
            <div className="flex justify-between">
                {title && <h4 className="text-md text-black">{title}</h4>}

                {balance < 0 ? (<h4 className="text-md text-black">Liabilities</h4>) : (<h4 className="text-md text-black">Assets</h4>)}

            </div>

            <div className="flex justify-center mt-4">
                {balance && balance >= 0 ? <h4 className="text-lg font-medium text-black">$&nbsp;{balance}</h4> : <h4 className="text-lg font-medium text-black">$&nbsp;({balance * -1})</h4>}
            </div>

            <div className="flex justify-center mt-4">
                {time && <h5 className="text-sm text-black">{time}</h5>}
            </div>
        </Card>
    );
}

export default AccountCard;
