import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import React from "react";

const PieGraph = () => {
    const state = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Rainfall",
          backgroundcolor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          bordercolor: "rgba(0,0,0,1)",
          borderwidth: 2,
          data: [65, 45, 123, 42, 43],
        },
      ],
    };
    const options = {
      Plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          text: "Average Rainfall per month",
          display: true,
          fontSize: 20,
        },
      },
    };
  
    return (
      <div className="PieGraph" >
        <Pie data={state} options={options}  />
  x    </div>
    );
  };
  export default PieGraph;