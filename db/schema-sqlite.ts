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

export const developers = sqliteTable('developer', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  bio: text('bio'),
  tags: text('tags'),
  profileUrl: text('profile_url'),
  avatarUrl: text('avatar_url'),
  socialMedia: blob('social_media'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const products = sqliteTable('product', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  description: text('description'),
  tags: text('tags'),
  category: text('category'),
  launchDate: integer('launch_date', { mode: 'timestamp' }),
  websiteUrl: text('website_url'),
  avatarUrl: text('avatar_url'),
  socialMedia: blob('social_media'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const productHistory = sqliteTable('product_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  developerId: integer('developer_id').references(() => developers.id),
  productId: integer('product_id').references(() => products.id),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  description: text('description'),
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