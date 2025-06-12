import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockChart({ data, symbol }) {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `₹${value.toFixed(2)}`}
          />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
            formatter={(value) => [`₹${value.toFixed(2)}`, symbol]}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#8884d8" 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}