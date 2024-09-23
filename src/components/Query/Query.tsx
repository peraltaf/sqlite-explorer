'use client';

import { ChangeEvent, useState } from 'react';
import { Label } from '../ui/label';
import { dbFileStore } from '@/context/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import ExecuteQuery from '@/app/actions/query_db';


const Query = () => {
  const { dbFile } = dbFileStore();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<object[]>([]);

  const updateQuery = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  }

  const runQuery = async () => {
    let file;

    if (typeof dbFile === 'string') {
      file = dbFile;
    } else {
      file = new FormData();
      file.append('backupFile', dbFile as File);
    }

    const res = await ExecuteQuery(file, query);
    setResults(res);
  }

  return (
    <>
      <div className='grid w-full gap-2'>
        <Label className='text-lg pt-4'>Query</Label>
        <Textarea
          onChange={updateQuery}
          placeholder='Enter your SQL statement...'
          rows={15}
        />
        <Button
          disabled={query === ''}
          onClick={runQuery}
        >Run Query</Button>
      </div>

      <Separator className='mt-4 mb-4' />

      <Label className='text-lg'>Results</Label>
      <Table>
        <TableHeader>
          <TableRow>
            {results.length > 0 && Object.keys(results[0]).map((d,i) => (
              <TableHead key={i}>{d}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length > 0 && results.map((d,i) => (
            <TableRow key={`table-row-${i}`}>
            { Object.entries(d).map((x,n) => 
              <TableCell key={`table-row-${i}-${n}`}>{x[1]}</TableCell>
            )}
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Query;
