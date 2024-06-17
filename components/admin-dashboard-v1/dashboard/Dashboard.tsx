import React from "react";
import DashboardCard from "../cards/DashboardCard";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
      <DashboardCard
        title="Posts"
        count={100}
        icon={<Newspaper className="text-slate-500" size={72} />}
      />
      <DashboardCard
        title="Categories"
        count={100}
        icon={<Folder className="text-slate-500" size={72} />}
      />
      <DashboardCard
        title="Users"
        count={750}
        icon={<User className="text-slate-500" size={72} />}
      />
      <DashboardCard
        title="Comments"
        count={1200}
        icon={<MessageCircle className="text-slate-500" size={72} />}
      />
      {/* other sections */}
    </div>
  );
};

export default Dashboard;
