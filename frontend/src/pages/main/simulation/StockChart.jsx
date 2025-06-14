import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function StockChart({ data, symbol }) {
  // Custom tooltip for better mobile experience
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
          <p className="text-sm font-bold text-gray-600">
            {new Date(label).toLocaleTimeString()}
          </p>
          <p className="text-lg font-black text-[#ff5722]">
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[200px] md:min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ 
            top: 10, 
            right: 10, 
            left: 10, 
            bottom: 10 
          }}
        >
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(unixTime) => {
              const date = new Date(unixTime);
              // Show only time on mobile, date + time on larger screens
              return window.innerWidth < 768 
                ? date.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                : date.toLocaleTimeString();
            }}
            tick={{ fontSize: 12 }}
            tickCount={window.innerWidth < 768 ? 4 : 6}
            angle={window.innerWidth < 768 ? -45 : 0}
            textAnchor={window.innerWidth < 768 ? 'end' : 'middle'}
            height={window.innerWidth < 768 ? 60 : 40}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => {
              // Shorter format on mobile
              return window.innerWidth < 768 
                ? `₹${value.toFixed(0)}`
                : `₹${value.toFixed(2)}`;
            }}
            tick={{ fontSize: 12 }}
            tickCount={5}
            width={window.innerWidth < 768 ? 50 : 60}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#ff5722', strokeWidth: 2, strokeDasharray: '5,5' }}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#ff5722"
            strokeWidth={3}
            dot={false}
            activeDot={{ 
              r: 6, 
              fill: '#ff5722',
              stroke: '#fff',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}