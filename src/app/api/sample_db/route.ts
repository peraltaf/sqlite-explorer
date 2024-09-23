import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { DBInfo, TableType } from '@/types/types';


const formatNumber = Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
});

export const GET = async () => {
  try {
    const db = new Database('chinook.db', { verbose: console.log });
    const initData = db.prepare(`SELECT * FROM sqlite_master`).all() as { type: string, name: string, tbl_name: string, rootpage: number, sql: string }[];
    const stats = db.prepare('SELECT name, SUM(pgsize) AS size FROM dbstat GROUP BY name').all() as { name: string, size: number }[];
    const columns = db.prepare(`SELECT 
        m.name as table_name, 
        p.name as column_name

      FROM 
        sqlite_master AS m

      JOIN 
        pragma_table_info(m.name) AS p

      WHERE
        m.type = 'table'

      ORDER BY 
        m.name, 
        p.cid`).all() as { table_name: string, column_name: string }[];

    const sources:TableType[] = initData.map((d) => {
      const table:TableType = {
        type: d.type,
        name: d.name,
        tbl_name: d.tbl_name,
        rootpage: +d.rootpage,
        sql: d.sql,
        size: formatNumber.format(stats.filter((x) => x.name === d.name)[0].size)
      }

      table.columns = columns.filter((x) => x.table_name === d.name).map((x) => x.column_name);

      if (d.type === 'table') {
        const rows = db.prepare(`SELECT COUNT(*) AS counts FROM ${d.name}`).all() as { counts: number }[];
        table.rowCount = rows[0].counts;

        const sample = db.prepare(`SELECT * FROM ${d.name} LIMIT 10`).all() as object[];
        table.sampleData = sample;
      }

      return table;
    });

    const version = db.prepare('PRAGMA schema_version').all() as { schema_version: number }[];
    const dbname = db.prepare('PRAGMA database_list').all() as { seq: number, name: string, file: string }[];

    const output:DBInfo = {
      metadata: {
        filename: 'sample.db',
        version: version[0].schema_version,
        size: formatNumber.format(850000),
        dbname: dbname[0].name
      },
      data: sources
    }

    return NextResponse.json(output);
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
