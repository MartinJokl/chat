CREATE TABLE `message` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sender` varchar(36) NOT NULL,
	`reciever` varchar(36),
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `message_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `message` ADD CONSTRAINT `message_sender_user_id_fk` FOREIGN KEY (`sender`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `message` ADD CONSTRAINT `message_reciever_user_id_fk` FOREIGN KEY (`reciever`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;