import Dashboard from "@/components/admin-dashboard-v1/dashboard/Dashboard";
import Navbar from "@/components/admin-dashboard-v1/navbar/Navbar";
import Sidebar from "@/components/admin-dashboard-v1/sidebar/Sidebar";
import React from "react";

type Props = {};

const AdminDashboardPage = (props: Props) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-screen w-[300px]">
          <Sidebar />
        </div>
        <div className="p-5 w-full md:max-w[1140px]">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
