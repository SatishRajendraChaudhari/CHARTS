import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LineChart } from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import yearlyData from './Data';

export default function CarWashLineChart() {
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [viewType, setViewType] = React.useState('monthly');
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  const [showAllDays, setShowAllDays] = React.useState(false);

  // Prepare data for the chart
  const prepareChartData = () => {
    const yearData = yearlyData.yearlyData[selectedYear];
    
    if (viewType === 'monthly') {
      // Monthly view - show all months
      const months = Object.keys(yearData.months);
      return {
        xAxis: months,
        series: [{
          id: 'monthly-totals',
          label: 'Monthly Revenue',
          data: months.map(month => yearData.months[month].total),
          color: mangoFusionPalette('light')[0],
        }]
      };
    } 
    else if (viewType === 'weekly') {
      // Weekly view - show all weeks for selected month
      const months = Object.keys(yearData.months);
      const allWeeks = months.flatMap(month => {
        const weeks = Object.keys(yearData.months[month].weeks);
        return weeks.map(week => ({
          label: `${month.substring(0, 3)} ${week}`,
          value: yearData.months[month].weeks[week].total
        }));
      });
      
      return {
        xAxis: allWeeks.map(week => week.label),
        series: [{
          id: 'weekly-totals',
          label: 'Weekly Revenue',
          data: allWeeks.map(week => week.value),
          color: mangoFusionPalette('light')[1],
        }]
      };
    }
    else if (viewType === 'daily') {
      // Daily view - show all days for selected week or all weeks
      const months = Object.keys(yearData.months);
      const allDays = months.flatMap(month => {
        const weeks = Object.keys(yearData.months[month].weeks);
        return weeks.flatMap(week => {
          const days = Object.entries(yearData.months[month].weeks[week].days);
          return days.map(([day, value]) => ({
            label: `${month.substring(0, 3)} ${week} ${day}`,
            value
          }));
        });
      });
      
      // If not showing all days, just show one week's data
      const displayDays = showAllDays ? allDays : allDays.slice(0, 7);
      
      return {
        xAxis: displayDays.map(day => day.label),
        series: [{
          id: 'daily-totals',
          label: 'Daily Revenue',
          data: displayDays.map(day => day.value),
          color: mangoFusionPalette('light')[2],
        }]
      };
    }
    
    return { xAxis: [], series: [] };
  };

  const chartData = prepareChartData();

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Car Wash Sales Trend - {selectedYear}
      </Typography>
      
      {/* Controls */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Object.keys(yearlyData.yearlyData).map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>View</InputLabel>
          <Select
            value={viewType}
            label="View"
            onChange={(e) => setViewType(e.target.value)}
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
          </Select>
        </FormControl>
        
        {viewType === 'daily' && (
          <FormControlLabel
            control={
              <Checkbox 
                checked={showAllDays}
                onChange={(e) => setShowAllDays(e.target.checked)}
              />
            }
            label="Show All Days"
          />
        )}
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={skipAnimation}
              onChange={(e) => setSkipAnimation(e.target.checked)}
            />
          }
          label="Skip Animation"
        />
      </Stack>
      
      {/* Line Chart */}
      {chartData.xAxis.length > 0 && (
        <LineChart
          xAxis={[{ 
            data: chartData.xAxis,
            scaleType: 'band',
            label: viewType === 'monthly' ? 'Month' : 
                   viewType === 'weekly' ? 'Week' : 'Day'
          }]}
          yAxis={[{
            label: 'Revenue ($)'
          }]}
          series={chartData.series}
          skipAnimation={skipAnimation}
          height={400}
          margin={{ left: 70, right: 20 }}
        />
      )}
      
      {/* Description */}
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
        {viewType === 'monthly' && 'Showing monthly totals for the selected year'}
        {viewType === 'weekly' && 'Showing weekly totals across all months'}
        {viewType === 'daily' && (showAllDays ? 
          'Showing daily revenue for the entire year' : 
          'Showing one week of daily revenue data')}
      </Typography>
    </Box>
  );
}