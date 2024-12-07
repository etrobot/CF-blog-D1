CREATE TABLE `developer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`bio` text,
	`tags` text,
	`profile_url` text,
	`avatar_url` text,
	`social_media` blob,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `product_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`developer_id` integer,
	`product_id` integer,
	`start_date` integer,
	`end_date` integer,
	`description` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`developer_id`) REFERENCES `developer`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`tags` text,
	`category` text,
	`launch_date` integer,
	`website_url` text,
	`avatar_url` text,
	`social_media` blob,
	`created_at` integer,
	`updated_at` integer
);
