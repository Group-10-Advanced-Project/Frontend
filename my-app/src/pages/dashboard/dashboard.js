import React, { useEffect } from "react";
import Charts from "../../components/dash-charts/charts";
const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div className="wrapper">
      <Charts />
    </div>
  );
};

export default Dashboard;
