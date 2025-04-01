import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Import your JSON data (adjust path as needed)
import yearlyData from './Data';

export default function SalesPieChart() {
  const [viewLevel, setViewLevel] = React.useState('yearly');
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedWeek, setSelectedWeek] = React.useState(null);

  // Get current data based on view level
  const getCurrentData = () => {
    const yearData = yearlyData.yearlyData[selectedYear];
    
    if (viewLevel === 'yearly') {
      return Object.entries(yearData.months).map(([month, data]) => ({
        id: month,
        label: month,
        value: data.total,
      }));
    } 
    else if (viewLevel === 'monthly' && selectedMonth) {
      return Object.entries(yearData.months[selectedMonth].weeks).map(([week, data]) => ({
        id: week,
        label: week,
        value: data.total,
      }));
    }
    else if (viewLevel === 'weekly' && selectedMonth && selectedWeek) {
      return Object.entries(yearData.months[selectedMonth].weeks[selectedWeek].days).map(([day, value]) => ({
        id: day,
        label: day,
        value: value,
      }));
    }
    
    return [];
  };

  const pieData = getCurrentData();

  // Handle click on pie slice
  const handleItemClick = (event, item) => {
    if (viewLevel === 'yearly') {
      setSelectedMonth(item.id);
      setViewLevel('monthly');
    } else if (viewLevel === 'monthly') {
      setSelectedWeek(item.id);
      setViewLevel('weekly');
    }
  };

  // Handle drill up
  const handleDrillUp = () => {
    if (viewLevel === 'weekly') {
      setViewLevel('monthly');
      setSelectedWeek(null);
    } else if (viewLevel === 'monthly') {
      setViewLevel('yearly');
      setSelectedMonth(null);
    }
  };

  // Handle filter change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setViewLevel('yearly');
    setSelectedMonth(null);
    setSelectedWeek(null);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setViewLevel('monthly');
    setSelectedWeek(null);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {viewLevel === 'yearly' ? 'Yearly Sales by Month' : 
         viewLevel === 'monthly' ? `${selectedMonth} Sales by Week` : 
         `${selectedMonth}, ${selectedWeek} Sales by Day`}
      </Typography>
      
      {/* Filter controls */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={handleYearChange}
          >
            {Object.keys(yearlyData.yearlyData).map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {viewLevel !== 'yearly' && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={handleMonthChange}
            >
              {Object.keys(yearlyData.yearlyData[selectedYear].months).map(month => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        
        {viewLevel === 'weekly' && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Week</InputLabel>
            <Select
              value={selectedWeek}
              label="Week"
              onChange={(e) => setSelectedWeek(e.target.value)}
            >
              {Object.keys(yearlyData.yearlyData[selectedYear].months[selectedMonth].weeks).map(week => (
                <MenuItem key={week} value={week}>{week}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Stack>
      
      {/* Pie Chart */}
      <PieChart
        series={[{
          data: pieData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          innerRadius: 30,
          paddingAngle: 5,
          cornerRadius: 5,
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 20,
        }]}
        height={400}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
          },
        }}
        onItemClick={handleItemClick}
      />
      
      {/* Navigation buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        {viewLevel !== 'yearly' && (
          <Button variant="outlined" onClick={handleDrillUp}>
            Back to {viewLevel === 'monthly' ? 'Yearly View' : 'Monthly View'}
          </Button>
        )}
        {viewLevel === 'yearly' && (
          <Button variant="outlined" disabled>
            Click on a month slice to drill down
          </Button>
        )}
        {viewLevel === 'monthly' && (
          <Button variant="outlined" disabled>
            Click on a week slice to see daily data
          </Button>
        )}
      </Stack>
    </Box>
  );
}
