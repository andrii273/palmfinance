import AvenueCard from "@/components/card/avenueCard";
import ContainerCard from "@/components/card/containerCard";
import TotalSpent from "@/components/charts/totalSpent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { instance } from "@/helpers/axios";
import { setOrientation } from "@material-tailwind/react/components/Tabs/TabsContext";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [bucket_difference, setBucektDifference] = useState(0);
  const [totalGoal, setTotalGoal] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [overallBalance1, setoverallBalance] = useState(0);
  const [assets1, setAssets] = useState(0);
  const [liabilities1, setLiabilities] = useState(0);
  const [difference1, setDifference] = useState(0);
  const router = useRouter();

  let overallBalance = 0,
    assets = 0,
    liabilities = 0,
    difference = 0;


  useEffect(() => {
    instance.get('/accounts/')
      .then((res) => {
        setAccounts(res.data.accounts);
      }).catch(error => {
        console.log(error.message);
      });
    instance.get('/buckets')
      .then((res) => {
        setBuckets(res.data.bucketData);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [router]);

  useEffect(() => {
    accounts.map((account, index) => {
      if (account.accountBalance >= 0) {
        assets = assets + account.accountBalance;
      } else {
        liabilities = liabilities + account.accountBalance;
      }

      overallBalance = assets + liabilities;
      console.log("over", overallBalance);
    });
    let temp = 0, temptotal = 0;
    buckets.map((bucket, index) => {
      temptotal += bucket.bucketGoal;
      bucket.accounts.map((account) => {
        temp += account.inputValue;
      })
    });
    setTotalGoal(temptotal);
    setTotalProgress(parseInt(temp * 100 / temptotal));

    difference = overallBalance - temp;
    setBucektDifference(difference);
    setoverallBalance(overallBalance);
    setLiabilities(liabilities);
    setAssets(assets);
    setDifference(difference)
  }, [accounts, buckets]);

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AvenueCard title='Overall Balance' value={overallBalance1} />
        <AvenueCard title='Assets' value={assets1} />
        <AvenueCard title='Liabilities' value={liabilities1} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <ContainerCard title="accounts" data={accounts} />
        <ContainerCard title="buckets" data={buckets} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AvenueCard title='Buckets Balance Difference' value={bucket_difference} />
        <AvenueCard title='Total Goals Amount' value={totalGoal} />
        <AvenueCard title='Total Goals Progress' value={totalProgress} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <TotalSpent title='Monthly Savings' />
      </div>
    </>
  )
}
