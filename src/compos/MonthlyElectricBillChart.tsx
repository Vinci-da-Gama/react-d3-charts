import { useEffect, useRef } from "react";
import Chart, { ChartType } from "chart.js/auto";
import { monthlyElectricBill } from "../constants/BillAndPrice";
import { BgColorsArr } from "../constants/BgColorsArr";

type ChartConfigType = {
  type: ChartType;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
};

const MonthlyElectricBillChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const chartConfig: ChartConfigType = {
      type: "pie",
      data: {
        labels: monthlyElectricBill.map((data) => data.month),
        datasets: [
          {
            label: "Electric Bill",
            data: monthlyElectricBill.map((data) => data.value),
            backgroundColor: BgColorsArr,
          },
        ],
      },
    };

    if (chartContainer.current) {
      const myChart = new Chart(chartContainer.current, chartConfig);
      return () => {
        myChart.destroy();
      };
    }
  }, []);

  return (
    <div style={{ width: "30%", height: "auto" }}>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default MonthlyElectricBillChart;
