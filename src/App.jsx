import * as React from 'react';
import CarWashSalesChart from './components/BarChart';
import PieCharts from './components/PieCharts';
import LineCharts from './components/LineCharts'
import IndiaChart from './components/IndiaChart'

function App() {
  return (
    <div>
      <CarWashSalesChart />
      <PieCharts/>
      <LineCharts/>
      <IndiaChart/>
    </div>
  );
}

export default App;