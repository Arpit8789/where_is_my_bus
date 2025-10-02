import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RouteChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="route" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="trips" fill="#3b82f6" name="Total Trips" />
        <Bar dataKey="passengers" fill="#22c55e" name="Passengers" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RouteChart;
