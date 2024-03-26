CREATE TABLE IF NOT EXISTS "cards" (
	"back_text" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"deck_id" uuid NOT NULL,
	"front_text" text NOT NULL,
	"has_failed" boolean DEFAULT false,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "decks" (
	"created_at" timestamp with time zone DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_deck" (
	"created_at" timestamp with time zone DEFAULT now(),
	"deckId" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_deck" ADD CONSTRAINT "user_deck_deckId_decks_id_fk" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
