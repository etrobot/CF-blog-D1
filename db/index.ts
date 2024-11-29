import { D1Database, D1Result } from '@cloudflare/workers-types';

let db: D1Database;

export function initializeDB(database: D1Database) {
  db = database;
}

export async function query(sql: string, params?: any[]): Promise<D1Result> {
  if (!db) {
    throw new Error('database initialization error');
  }
  return await db.prepare(sql).bind(params || []).all();
}

export async function execute(sql: string, params?: any[]): Promise<D1Result> {
  if (!db) {
    throw new Error('database initialization error');
  }
  return await db.prepare(sql).bind(params || []).run();
}