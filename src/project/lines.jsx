import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { yearlyData, getMonthNames, getDaysForMonth } from './data';

export default function CustomLineChart() {
  const allMonths = getMonthNames();
  
  // State for each dropdown
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [selectedSixMonths, setSelectedSixMonths] = React.useState(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const [selectedThreeMonths, setSelectedThreeMonths] = React.useState(['Oct', 'Nov', 'Dec']);
  const [selectedOneMonth, setSelectedOneMonth] = React.useState('Dec');
  
  // State to track which view is active
  const [activeView, setActiveView] = React.useState('12m');

  // Prepare chart data based on active view
  const prepareChartData = () => {
    switch (activeView) {
      case '12m':
        return {
          xAxis: allMonths,
          series: [{
            data: allMonths.map(month => yearlyData.months[month].monthlyTotal),
          }],
          label: 'Monthly Totals'
        };
      case '6m':
        return {
          xAxis: selectedSixMonths,
          series: [{
            data: selectedSixMonths.map(month => yearlyData.months[month].monthlyTotal),
          }],
          label: '6 Month Totals'
        };
      case '3m':
        return {
          xAxis: selectedThreeMonths,
          series: [{
            data: selectedThreeMonths.map(month => yearlyData.months[month].monthlyTotal),
          }],
          label: '3 Month Totals'
        };
      case '1m':
        const daysData = getDaysForMonth(selectedOneMonth);
        return {
          xAxis: daysData.map(item => `${selectedOneMonth} ${item.day}`),
          series: [{
            data: daysData.map(item => item.value),
          }],
          label: 'Daily Values'
        };
      default:
        return { xAxis: [], series: [], label: '' };
    }
  };

  const chartData = prepareChartData();

  // Handle 6 month selection (showing months in descending order)
  const handleSixMonthChange = (startMonth) => {
    const startIndex = allMonths.indexOf(startMonth);
    const sixMonths = [];
    for (let i = 0; i < 6; i++) {
      const index = (startIndex - i + 12) % 12;
      sixMonths.unshift(allMonths[index]);
    }
    setSelectedSixMonths(sixMonths);
    setActiveView('6m');
  };

  // Handle 3 month selection (showing months in descending order)
  const handleThreeMonthChange = (startMonth) => {
    const startIndex = allMonths.indexOf(startMonth);
    const threeMonths = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex - i + 12) % 12;
      threeMonths.unshift(allMonths[index]);
    }
    setSelectedThreeMonths(threeMonths);
    setActiveView('3m');
  };

  // Handle 1 month selection
  const handleOneMonthChange = (month) => {
    setSelectedOneMonth(month);
    setActiveView('1m');
  };

  // Helper function to calculate end month for display
  const getEndMonth = (startMonth, monthsToAdd) => {
    const startIndex = allMonths.indexOf(startMonth);
    const endIndex = (startIndex + monthsToAdd) % 12;
    return allMonths[endIndex];
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Data Visualization - 2024
      </Typography>

      {/* Four separate dropdowns */}
      <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {/* 12 Months Dropdown */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>12 Months</InputLabel>
          <Select
            value={selectedYear}
            label="12 Months"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setActiveView('12m');
            }}
          >
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </FormControl>

        {/* 6 Months Dropdown */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>6 Months</InputLabel>
          <Select
            value={selectedSixMonths[5] || ''}
            label="6 Months"
            onChange={(e) => handleSixMonthChange(e.target.value)}
          >
            {allMonths.map((month) => (
              <MenuItem key={`6m-${month}`} value={month}>
                {`${month} to ${getEndMonth(month, 7)}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 3 Months Dropdown */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>3 Months</InputLabel>
          <Select
            value={selectedThreeMonths[2] || ''}
            label="3 Months"
            onChange={(e) => handleThreeMonthChange(e.target.value)}
          >
            {allMonths.map((month) => (
              <MenuItem key={`3m-${month}`} value={month}>
                {`${month} to ${getEndMonth(month, 10)}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 1 Month Dropdown */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>1 Month</InputLabel>
          <Select
            value={selectedOneMonth}
            label="1 Month"
            onChange={(e) => handleOneMonthChange(e.target.value)}
          >
            {allMonths.map((month) => (
              <MenuItem key={`1m-${month}`} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Line Chart */}
      {chartData.xAxis.length > 0 && (
        <LineChart
          xAxis={[{
            data: chartData.xAxis,
            scaleType: activeView === '1m' ? 'point' : 'band',
            label: activeView === '1m' ? 'Day' : 'Month'
          }]}
          series={[
            {
              data: chartData.series[0].data,
              label: chartData.label,
              showMark: ({ index }) => index % (activeView === '1m' ? 3 : 1) === 0
            }
          ]}
          height={400}
          margin={{ left: 70, right: 20 }}
        />
      )}

      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        {activeView === '12m' && 'Showing all 12 months of 2024'}
        {activeView === '6m' && `Showing last 6 months: ${selectedSixMonths.join(' → ')}`}
        {activeView === '3m' && `Showing last 3 months: ${selectedThreeMonths.join(' → ')}`}
        {activeView === '1m' && `Showing daily data for ${selectedOneMonth} 2024`}
      </Typography>
    </Box>
  );
}