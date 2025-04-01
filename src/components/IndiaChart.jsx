import React from 'react';
import Chart from 'react-google-charts';

const IndiaGoogleChart = () => {
  return (
    <div style={{ width: '100%', maxWidth: '700px', height: '400px', margin: '0 auto' }}>
  <Chart
    width="100%"
    height="100%"
        chartType="GeoChart"
        loader={<div>Loading India Map...</div>}
        data={[
          ['State', 'Population'],
          ['IN-UP', 199812341],
          ['IN-MH', 112374333],
          ['IN-BR', 104099452],
          ['IN-WB', 91276115],
          ['IN-MP', 72626809],
          ['IN-TN', 72147030],
          ['IN-RJ', 68548437],
          ['IN-KA', 61095297],
          ['IN-GJ', 60439692],
          // Reduced data points for smaller size
          ['IN-AP', 49386799],
          ['IN-OR', 41974218],
          ['IN-TG', 35003674],
          ['IN-KL', 33406061],
          ['IN-JH', 32988134],
          ['IN-AS', 31205576],
          ['IN-PB', 27743338],
          ['IN-CT', 25545198],
          ['IN-HR', 25351462]
        ]}
        options={{
          region: 'IN',
          resolution: 'provinces',
          colorAxis: { 
            colors: ['#e7711c', '#4374e0'],
            minValue: 0
          },
          backgroundColor: 'transparent',
          datalessRegionColor: '#f0f0f0',
          defaultColor: '#f5f5f5',
          tooltip: { 
            textStyle: { 
              fontSize: 10 
            } 
          },
          chartArea: {
            left: 10,
            top: 10,
            width: '90%',
            height: '90%'
          }
        }}
        mapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      />
    </div>
  );
};

export default IndiaGoogleChart;