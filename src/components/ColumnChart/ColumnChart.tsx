import {
  Bar,
  BarChart,
  Rectangle,
  XAxis
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart';
import { Datum } from '@/types/types';


interface Props {
  label: string
  data: Datum[]
  dataKey: string
}

const ColumnChart = ({ label, data, dataKey }:Props) => {
  return (
    <Card >
      <CardHeader className='space-y-0 pb-2'>
        <CardTitle className='text-2xl'>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: 'Steps',
              color: 'hsl(var(--chart-1))',
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={data}
          >
            <Bar
              dataKey={dataKey}
              fill='var(--color-steps)'
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.9} />}
            />
            <XAxis
              dataKey='label'
              tickLine={false}
              axisLine={false}
              tickMargin={4}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  indicator='line'
                />
              }
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ColumnChart;
