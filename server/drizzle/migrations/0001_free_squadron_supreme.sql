ALTER TABLE "group_messages" DROP CONSTRAINT "group_messages_group_id_groupChats_id_fk";
--> statement-breakpoint
ALTER TABLE "group_messages" DROP CONSTRAINT "group_messages_sender_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "group_messages" ADD COLUMN "groupId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "group_messages" ADD COLUMN "senderId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "group_messages" ADD COLUMN "messageText" text NOT NULL;--> statement-breakpoint
ALTER TABLE "group_messages" ADD COLUMN "createdAt" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_messages" ADD CONSTRAINT "group_messages_groupId_groupChats_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."groupChats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_messages" ADD CONSTRAINT "group_messages_senderId_users_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "group_messages" DROP COLUMN IF EXISTS "group_id";--> statement-breakpoint
ALTER TABLE "group_messages" DROP COLUMN IF EXISTS "sender_id";--> statement-breakpoint
ALTER TABLE "group_messages" DROP COLUMN IF EXISTS "message_text";--> statement-breakpoint
ALTER TABLE "group_messages" DROP COLUMN IF EXISTS "created_at";