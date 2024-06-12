import React from "react";
import DashboardCard from "../cards/DashboardCard";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
      <DashboardCard />
    </div>
  );
};

export default Dashboard;
