import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { LucideIcon } from 'lucide-react';


interface Props {
  Icon: LucideIcon
  label: string
  metric: number
  desc: string
}

const InfoTile = ({ Icon, label, metric, desc }:Props) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          {label}
        </CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{metric}</div>
        <p className='text-xs text-muted-foreground'>
          {desc}
        </p>
      </CardContent>
    </Card>
  );
}

export default InfoTile;
