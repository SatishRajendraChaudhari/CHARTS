import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Button } from '@mui/material';
import { chartData } from './data';

const buttonOrder = ['12 Months', '6 Months', '30 Days', '7 Days'];

const LineChartComponent = () => {
  const [timeRange, setTimeRange] = useState(buttonOrder[0]);
  const data = chartData[timeRange];

  const waveData = data.values.map((value, index) =>
    value + (data.wavePattern[index] * (value * 0.015)));

  // Custom label formatting function
  const formatXAxisLabel = (value) => {
    if (timeRange === '30 Days') {
      return value.split(' ')[1];
    }
    return value;
  };

  // Function to get the full year for a given short year (e.g., '23' -> 2023)
  const getFullYear = (shortYear) => {
    const currentYear = new Date().getFullYear(); // e.g., 2025
    const prefix = Math.floor(currentYear / 100); // e.g., 20
    const fullYear = parseInt(`${prefix}${shortYear}`, 10);

    // Basic heuristic: if the fullYear is much greater than currentYear, it might be 19xx
    // This is a simple assumption, for robust solution, date parsing is better.
    if (fullYear > currentYear + 10) { // If '25' in 2024 results in 2025, but '98' in 2024 would be 1998
      return parseInt(`19${shortYear}`, 10);
    }
    return fullYear;
  };

  return (
    <>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 1,
          width: 'auto'
        }}
      >
        {buttonOrder.map((range) => (
          <Button
            key={range}
            onClick={() => setTimeRange(range)}
            sx={{
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: timeRange === range ? '600' : '400',
              backgroundColor: timeRange === range ? 'darkblue' : 'transparent',
              color: timeRange === range ? 'white' : 'text.secondary',
              borderBottom: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: timeRange === range ? 'darkblue' : 'rgba(25, 118, 210, 0.04)',
                color: timeRange === range ? 'white' : 'text.secondary',
              }
            }}
          >
            {range}
          </Button>
        ))}
      </Box>

      <Box>
        <LineChart
          height={600}
          width={900}
          series={[{
            data: waveData,
            area: true,
            showMark: ({ index }) => index === waveData.length - 1,
            color: '#1976d2',
            curve: 'natural',
          }]}
          xAxis={[{
            data: data.labels,
            scaleType: 'point',
            tickLabelStyle: {
              fontSize: 11,
              fill: '#666',
            },
            tickInterval: timeRange === '30 Days' ? undefined : undefined,
            valueFormatter: formatXAxisLabel
          }]}
          yAxis={[{ tickLabelStyle: { display: 'none' } }]}
          slotProps={{
            tooltip: {
              // *** REVISED TOOLTIP FORMATTER ***
              formatter: (params) => {
                const dataIndex = params[0]?.dataIndex;
                if (dataIndex === undefined) {
                  return 'N/A';
                }

                const label = data.labels[dataIndex];
                const value = data.values[dataIndex];
                let formattedDate = '';

                if (timeRange === '30 Days' || timeRange === '7 Days') {
                  // For daily/weekly views, the label is like 'May 1' or 'Mon 26'
                  // The data.tooltips array for these already has the full date including year
                  // So we can directly use it, as long as it's consistently correct.
                  // We'll trust the data.tooltips for these ranges for now.
                   return data.tooltips[dataIndex];
                } else {
                  // For '12 Months' and '6 Months', labels are like 'Jun 24'
                  const parts = label.split(' '); // e.g., ['Jun', '24']
                  if (parts.length === 2) {
                    const monthAbbr = parts[0];
                    const shortYear = parts[1];
                    const fullYear = getFullYear(shortYear); // Get 2023, 2024 etc.

                    // Map abbreviated month to full month name (for consistency)
                    const monthMap = {
                      'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April',
                      'May': 'May', 'Jun': 'June', 'Jul': 'July', 'Aug': 'August',
                      'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
                    };
                    const fullMonth = monthMap[monthAbbr];

                    if (fullMonth && fullYear) {
                      formattedDate = `${fullMonth} ${fullYear}`;
                    } else {
                      formattedDate = label; // Fallback to original label if parsing fails
                    }
                  } else {
                    formattedDate = label; // Fallback to original label
                  }
                }

                // Format the number with commas for readability
                const formattedValue = value.toLocaleString();

                return `${formattedDate}: ${formattedValue}`;
              }
            }
          }}
          sx={{
            '& .MuiChartsAxis-directionX': {
              opacity: 1,
              '& .MuiChartsAxis-tickLabel': {
                transform: timeRange === '30 Days' ? 'rotate(-45deg)' : 'none',
                textAnchor: timeRange === '30 Days' ? 'end' : 'middle'
              }
            },
            '& .MuiChartsAxis-directionY': { opacity: 0 },
            '& .MuiMarkElement-root': {
              fill: '#1976d2',
              stroke: 'white',
              strokeWidth: 2,
            },
            '& .MuiAreaElement-root': {
              fill: 'url(#areaGradient)',
            },
            '& .MuiLineElement-root': {
              strokeWidth: 2.5,
              strokeLinecap: 'round',
            },
          }}
          grid={{ horizontal: true }}
          margin={{
            top: 10,
            bottom: timeRange === '30 Days' ? 80 : 40,
            left: 20,
            right: 20
          }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1976d2" stopOpacity={0.3}/>
              <stop offset="100%" stopColor="#1976d2" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
        </LineChart>
      </Box>
    </>
  );
};

export default LineChartComponent;