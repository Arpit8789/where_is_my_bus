import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="trips" fill="#3b82f6" name="Trips" />
        <Bar yAxisId="right" dataKey="rating" fill="#22c55e" name="Rating" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
