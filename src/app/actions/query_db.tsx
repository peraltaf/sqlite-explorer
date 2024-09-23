'use server';

import Database from 'better-sqlite3';


export default async function ExecuteQuery(obj:FormData | string, query:string) {
  let db;

  if (typeof obj === 'string') {
    db = new Database(obj);
    db.pragma('journal_mode = WAL'); 
  } else {
    const file = obj.get('backupFile') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    db = new Database(buffer);
    db.pragma('journal_mode = WAL');
  }

  const results = db.prepare(query).all() as object[];

  return results;
}
