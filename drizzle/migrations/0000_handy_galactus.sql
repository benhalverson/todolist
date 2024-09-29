CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`content` text NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
