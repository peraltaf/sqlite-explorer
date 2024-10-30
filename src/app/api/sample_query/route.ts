import { NextResponse, NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';


export const POST = async (req:NextRequest) => {
  try {
    const dbPath = path.join(process.cwd(), 'chinook.db');
    const { query } = await req.json();
    const db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) console.error(err.message);
        console.log('Connected to the profile database.');
      }
    );

    const res = new Promise((resolve,reject) => 
      db.all(query, (err, rows) =>
        err ? reject(err) : resolve(rows)
      )
    );

    return NextResponse.json(await res);
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: error, status: 500 });
  }
};
