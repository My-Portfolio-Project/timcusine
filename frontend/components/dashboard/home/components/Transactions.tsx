'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default function TransactionChart() {
  return (
    <div className="px-5 py-5" style={{ width: '100%', height: 300 }}>
      <h1 className="text-white text-2xl font-semibold mb-5">Transaction</h1>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30, // space between chart and right edge
            left: 10, // space between chart and y-axis
            bottom: 20, // space below x-axis
          }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            padding={{ left: 20, right: 20 }} // ✅ valid for XAxis
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 500', 'dataMax + 500']}
            padding={{ top: 10, bottom: 10 }} // ✅ valid for YAxis
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
