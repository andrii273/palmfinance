import Card from "@/components/card";
import BarChart from "@/components/charts/default/barChart";

import {
  barChartDataWeeklyRevenue,
  barChartOptionsWeeklyRevenue,
} from "@/variables/charts";

const WeeklyRevenue = (props) => {
  const { title } = props;

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="text-center">
        {title && <h3 className="text-3xl font-bold text-black">{title}</h3>}
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="w-full">
          <BarChart
            series={barChartDataWeeklyRevenue}
            options={barChartOptionsWeeklyRevenue}
          />
        </div>
      </div>
    </Card>
  );
};

export default WeeklyRevenue;
