import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/d1';
import { D1Database } from '@cloudflare/workers-types';

export const tag = sqliteTable('tag', {
  name: text('name').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const blog = sqliteTable('blog', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title'),
  slug: text('slug').unique(),
  categoryId: integer('category_id').references(() => category.id),
  content: text('content'),
  summary: text('summary'),
  coverUrl: text('cover_url'),
  tags: text('tags'),
  authorId: integer('author_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const db = drizzle(process.env.MY_DB as unknown as D1Database);