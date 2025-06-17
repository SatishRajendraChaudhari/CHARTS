import * as React from 'react';
import CarWashSalesChart from './components/BarChart';
import PieCharts from './components/PieCharts';
import LineCharts from './components/LineCharts'
import IndiaChart from './components/IndiaChart'
import Lines from './project/lines'

function App() {
  return (
    <div>
      {/* <CarWashSalesChart />
      <PieCharts/>
      <LineCharts/>
      <IndiaChart/> */}
      <Lines/>
    </div>
  );
}

export default App;