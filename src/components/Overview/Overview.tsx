import InfoTile from '../InfoTile/InfoTile';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { InspectionPanel } from 'lucide-react';
import {
  Table,
  DatabaseZap,
  TextSearch,
  Activity
} from 'lucide-react';
import ColumnChart from '../ColumnChart/ColumnChart';
import { DBInfo } from '@/types/types';


interface OverviewProps {
  dbInfo: DBInfo
}

const Overview = ({ dbInfo }:OverviewProps) => {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Metadata
          </CardTitle>
          <InspectionPanel className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
            <dl>
              <dt>Filename</dt>
              <dd>{dbInfo.metadata.filename}</dd>
            </dl>

            <dl>
              <dt>Database Name</dt>
              <dd>{dbInfo.metadata.dbname ?? ''}</dd>
            </dl>

            <dl>
              <dt>Schema Version</dt>
              <dd>{dbInfo.metadata.version}</dd>
            </dl>

            <dl>
              <dt>Database Size</dt>
              <dd>{dbInfo.metadata.size}</dd>
            </dl>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
        <InfoTile
          Icon={Table}
          label='Tables'
          metric={dbInfo.data.filter((d) => d.type === 'table').length}
          desc='Number of tables in the database.'
        />

        <InfoTile
          Icon={DatabaseZap}
          label='Indexes'
          metric={dbInfo.data.filter((d) => d.type === 'index').length}
          desc='Number of indexes in the database.'
        />

        <InfoTile
          Icon={TextSearch}
          label='Views'
          metric={dbInfo.data.filter((d) => d.type === 'view').length}
          desc='Number of views in the database.'
        />

        <InfoTile
          Icon={Activity}
          label='Triggers'
          metric={dbInfo.data.filter((d) => d.type === 'trigger').length}
          desc='Number of triggers in the database.'
        />
      </div>

      <div className='grid gap-8 grid-cols-3'>
        <ColumnChart
          label='Rows Per Table'
          data={dbInfo.data.filter((d) => d.type === 'table').map((d) => ({ label: d.name, rows: d.rowCount! }))}
          dataKey='rows'
        />

        <ColumnChart
          label='Columns Per Table'
          data={dbInfo.data.filter((d) => d.type === 'table').map((d) => ({ label: d.name, columns: d.columns!.length! }))}
          dataKey='columns'
        />

        <ColumnChart
          label='Indexes Per Table'
          data={dbInfo.data.filter((d) => d.type === 'index').reduce((a:{ label: string, indexes: number }[],c) => {
            const idx = a.findIndex((d) => d.label === c.tbl_name);
      
            if (idx !== -1) {
              a[idx].indexes++;
              return a;
            } else {
              return [...a, { label: c.tbl_name, indexes: 1 }];
            }
          }, [])}
          dataKey='indexes'
        />
      </div>
    </div>
  );
}

export default Overview;
