import React from "react";

import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart,
} from "react-icons/md";

import Card from "@/components/card";
import LineChart from "@/components/charts/default/lineChart";

import {
    lineChartDataTotalSpent,
    lineChartOptionsTotalSpent,
} from "@/variables/charts";

const TotalSpent = (props) => {
    const { title } = props;

    return (
        <Card extra="!p-[20px] text-center">
            <div className="text-center">
                {title && <h3 className="text-3xl font-bold text-black">{title}</h3>}
            </div>

            <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                <div className="flex flex-col">
                    <div className="flex flex-col items-start">
                        <p className="mt-2 text-sm text-gray-600">Savings</p>
                    </div>
                </div>
                <div className="h-full w-full">
                    <LineChart
                        options={lineChartOptionsTotalSpent}
                        series={lineChartDataTotalSpent}
                    />
                </div>
            </div>
        </Card>
    );
};

export default TotalSpent;