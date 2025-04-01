import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import carWashData from './Data.json';

const CarWashSalesChart = () => {
  // View state management
  const [viewLevel, setViewLevel] = React.useState('year'); // 'year', 'month', 'week'
  const [selectedMonth, setSelectedMonth] = React.useState('');
  const [selectedWeek, setSelectedWeek] = React.useState('');

  const yearData = carWashData.yearlyData['2024'];
  const months = Object.keys(yearData.months);
  const weeks = selectedMonth ? Object.keys(yearData.months[selectedMonth].weeks) : [];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Color definitions
  const monthColor = '#1976d2'; // Blue for months
  const weekColors = [
    '#4caf50', // Green
    '#ff9800', // Orange
    '#e91e63', // Pink
    '#9c27b0', // Purple
    '#009688', // Teal
  ]; // Different colors for weeks

  // Handle bar clicks for drill-down
  const handleBarClick = (event, barData) => {
    if (!barData) return;
    
    if (viewLevel === 'year') {
      const monthIndex = barData.dataIndex;
      setSelectedMonth(months[monthIndex]);
      setViewLevel('month');
    } 
    else if (viewLevel === 'month') {
      const weekIndex = barData.dataIndex;
      setSelectedWeek(weeks[weekIndex]);
      setViewLevel('week');
    }
  };

  // Handle drill-up navigation
  const handleDrillUp = () => {
    if (viewLevel === 'week') {
      setViewLevel('month');
      setSelectedWeek('');
    } 
    else if (viewLevel === 'month') {
      setViewLevel('year');
      setSelectedMonth('');
    }
  };

  // Handle dropdown changes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSelectedWeek('');
    setViewLevel(event.target.value ? 'month' : 'year');
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
    setViewLevel(event.target.value ? 'week' : 'month');
  };

  // Get data for current view level with colors
  const getChartData = () => {
    switch (viewLevel) {
      case 'year':
        return {
          series: [{
            data: months.map(month => yearData.months[month].total),
            label: 'Monthly Sales',
            color: monthColor, // Single color for all months
          }],
          xAxis: months,
          title: '2024 Monthly Sales',
        };
      case 'month':
        return {
          series: [{
            data: weeks.map(week => yearData.months[selectedMonth].weeks[week].total),
            label: 'Weekly Sales',
            color: weeks.map((_, index) => weekColors[index % weekColors.length]), // Different colors for weeks
          }],
          xAxis: weeks.map(week => `Week ${week.split(' ')[1]}`),
          title: `${selectedMonth} Weekly Sales`,
        };
      case 'week':
        return {
          series: daysOfWeek.map(day => ({
            data: [yearData.months[selectedMonth].weeks[selectedWeek].days[day] || 0],
            label: day,
          })),
          xAxis: ['Daily Sales'],
          title: `${selectedMonth} - ${selectedWeek} Daily Sales`,
        };
      default:
        return {
          series: [],
          xAxis: [],
          title: '',
        };
    }
  };

  const { series, xAxis, title } = getChartData();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      
      {/* Navigation controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        {/* Drill-up button */}
        {viewLevel !== 'year' && (
          <Button 
            variant="outlined" 
            onClick={handleDrillUp}
            sx={{ textTransform: 'none' }}
          >
            ← Back
          </Button>
        )}

        {/* Month dropdown */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
          >
            <MenuItem value="">All Months</MenuItem>
            {months.map(month => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Week dropdown (only visible when month is selected) */}
        {selectedMonth && (
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Week</InputLabel>
            <Select
              value={selectedWeek}
              onChange={handleWeekChange}
              label="Week"
              disabled={viewLevel === 'year'}
            >
              <MenuItem value="">All Weeks</MenuItem>
              {weeks.map(week => (
                <MenuItem key={week} value={week}>{week}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <BarChart
        height={400}
        series={series}
        xAxis={[{ 
          scaleType: 'band', 
          data: xAxis,
          categoryGapRatio: viewLevel === 'week' ? 0.5 : 0.2,
          barGapRatio: 0.1
        }]}
        yAxis={[{ label: 'Sales ($)' }]}
        tooltip={{ trigger: 'item' }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
          },
        }}
        onItemClick={viewLevel !== 'week' ? handleBarClick : undefined}
      />
    </Box>
  );
};

export default CarWashSalesChart;