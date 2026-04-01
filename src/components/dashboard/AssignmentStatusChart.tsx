import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface AssignmentStatusChartProps {
  data: Array<{ month: string; completed: number; pending: number }>
}

function AssignmentStatusChart({ data }: AssignmentStatusChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
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
        <Bar dataKey="completed" fill="#10b981" name="Completed" />
        <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default AssignmentStatusChart
