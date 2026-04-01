import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ProgressChartProps {
  data: Array<{ month: string; score: number; average: number }>
}

function ProgressChart({ data }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#0ea5e9"
          strokeWidth={2}
          name="Your Score"
          dot={{ fill: '#0ea5e9', r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#94a3b8"
          strokeWidth={2}
          name="Class Average"
          strokeDasharray="5 5"
          dot={{ fill: '#94a3b8', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ProgressChart
