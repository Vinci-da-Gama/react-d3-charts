import HourlyElectricPriceChart from "./compos/HourlyElectricPriceChart";
import MonthlyElectricBillChart from "./compos/MonthlyElectricBillChart";

const App = () => {
  return (
    <div>
      <MonthlyElectricBillChart />
      <hr />
      <HourlyElectricPriceChart />
    </div>
  );
};

export default App;
