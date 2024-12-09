import { getRequestContext } from '@cloudflare/next-on-pages'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from '@/db/schema-sqlite'

export const runtime = 'edge'

export function initDbConnection() {
  if (process.env.NODE_ENV === 'development') {
    const { env: requestEnv } = getRequestContext()

    // @ts-expect-error DB is exist
    return drizzle(requestEnv.MY_DB, { schema })
  }

  return drizzle(process.env.MY_DB as unknown as D1Database, { schema })
}

export const db = initDbConnection()