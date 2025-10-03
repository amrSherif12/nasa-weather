import * as React from 'react';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import "./LineGraph.css"


export default function SimpleLineChart({ x, y, title }) {
    return (
    <div className="chart" style={{ width: '100%' }}>
      <h1 className="chart-title" style={{ color: 'white', fontSize: '25px', marginBottom: '16px', marginLeft: "45px" }}>{title.replace(/_/g, " ")
  .replace(/\b\w/g, char => char.toUpperCase())}</h1>
      <Box sx={{ width: '46vw', minWidth: 300, height: 300 }}>
        <LineChart

          series={[
            { data: y, label: title.replace(/_/g, " ")
              .replace(/\b\w/g, char => char.toUpperCase()) },
          ]}
          xAxis={[{ scaleType: 'point', data: x }]}
          yAxis={[{ width: 50 }]}
          legend={{ show: false }}

        />
      </Box>
    </div>
  );
}
