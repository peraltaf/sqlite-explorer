import { NextResponse, NextRequest } from 'next/server';
import Database from 'better-sqlite3';


export const POST = async (req:NextRequest) => {
  try {
    const db = new Database('chinook.db', { verbose: console.log });
    const { query } = await req.json();
    const results = db.prepare(query).all();

    return NextResponse.json(results);
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
