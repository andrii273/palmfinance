import { instance } from "@/helpers/axios";
import { formattedNumber } from "@/utils/common";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const BucketCard = (props) => {
    const { title, accounts, empty } = props;
    const router = useRouter();

    let { goal } = props;
    let amount = 0,
        height = 0;

    if (Array.isArray(accounts)) {
        for (const account of accounts) {
            if ( account.isEntire ) {
                amount += account.accountBalance;
            } else {
                amount += account.inputValue;
            }
        }
    } else {
        
    }

    height = amount / goal * 300;

    goal && ( goal = formattedNumber(goal) );
    amount && ( amount = formattedNumber(amount) );

    return (
        !empty ? <div className="cylinder flex flex-col justify-between relative overflow-hidden mx-auto w-full h-full min-h-[300px] bg-white border-l border-r border-black rounded-[50px/25px] before:absolute before:top-0 before:left-0 before:w-full before:h-[50px] before:rounded-[50px/25px] before:bg-[#a0a0a033] before:border-black before:border before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[50px] after:rounded-[50px/25px] after:bg-[#a0a0a066] after:border-b after:border-black after:content-['']">
            <div className="content-top p-4 z-10">
                <h4 className="text-md text-black text-center font-bold">{title}</h4>
                <p className="text-lg text-black mt-5">Goal: $&nbsp;{goal}</p>
            </div>
            <div className={`water absolute left-0 bottom-0 w-full bg-[#00a0a080] rounded-[50px/25px] transition before:absolute before:top-0 before:left-0 before:w-full before:h-[50px] before:rounded-[50px/25px] before:bg-[#00a0a033] before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[50px] after:rounded-[50px/25px] after:bg-[#00a0a066] after:content-['']`} style={{height: `${height}px`}}></div>
            <div className="content-bottom p-4 z-10">
                <p className="text-md text-black font-light">Amount: $&nbsp;{amount}</p>
            </div>
        </div> : <div className="cylinder flex flex-col justify-between relative overflow-hidden mx-auto w-full h-full min-h-[300px] bg-white border-l border-r border-black rounded-[50px/25px] before:absolute before:top-0 before:left-0 before:w-full before:h-[50px] before:rounded-[50px/25px] before:bg-[#a0a0a033] before:border-black before:border before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[50px] after:rounded-[50px/25px] after:bg-[#a0a0a066] after:border-b after:border-black after:content-['']">
            <div className="flex justify-center items-center h-full text-black text-3xl font-medium">
                +
            </div>
        </div>
    );
}

export default BucketCard;