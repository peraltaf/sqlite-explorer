'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card';
import { InspectionPanel } from 'lucide-react';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { dbInfoStore } from '@/context/store';
import CodeBlock from '../CodeBlock/CodeBlock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { TableType } from '@/types/types';
import { Separator } from '../ui/separator';


const Tables = () => {
  const { dbInfo } = dbInfoStore();
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>();
  const [tableInfo, setTableInfo] = useState<TableType>();

  const onChangeSelect = (sel:string) => {
    setSelectedTable(sel);
    setTableInfo(dbInfo?.data.filter((d) => d.tbl_name === sel && d.type === 'table')[0]);
  }

  useEffect(() => {
    const tableList = dbInfo!.data.filter((d) => d.type === 'table').map((d) => d.tbl_name);
    setSelectedTable(tableList[0]);
    setTables(tableList);
    setTableInfo(dbInfo?.data.filter((d) => d.tbl_name === tableList[0] && d.type === 'table')[0]);
  }, [dbInfo]);

  return (
    <div className='mt-4'>
      <Label>Select a table</Label>
      <Select
        value={selectedTable}
        onValueChange={(sel) => onChangeSelect(sel)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue
            aria-label={selectedTable}
          >
            {selectedTable}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {tables.map((d) => (
            <SelectItem
              key={d}
              value={d}
            >
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {tableInfo && <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
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
                <dt>Rows</dt>
                <dd>{tableInfo?.rowCount}</dd>
              </dl>

              <dl>
                <dt>Columns</dt>
                <dd>{tableInfo?.columns?.length}</dd>
              </dl>

              <dl>
                <dt>Indexes</dt>
                <dd>{dbInfo?.data.filter((d) => d.tbl_name === selectedTable && d.type === 'index').length}</dd>
              </dl>

              <dl>
                <dt>Size</dt>
                <dd>{tableInfo?.size}</dd>
              </dl>
            </div>
          </CardContent>
        </Card>

        <Separator className='mt-2 mb-2' />

        <CodeBlock style={vs2015} code={tableInfo?.sql ?? ''} language={'sql'} />

        <Separator className='mt-2 mb-2' />

        <Label className='text-lg'>Sample Data</Label>
        <Table>
          <TableHeader>
            <TableRow>
              {tableInfo?.sampleData && Object.keys(tableInfo?.sampleData[0]).map((d,i) => (
                <TableHead key={i}>{d}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableInfo?.sampleData && tableInfo?.sampleData.map((d,i) => (
              <TableRow key={`table-row-${i}`}>
              { Object.entries(d).map((x,n) => 
                <TableCell key={`table-row-${i}-${n}`}>{x[1]}</TableCell>
              )}
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      }
    </div>
  );
}

export default Tables;
