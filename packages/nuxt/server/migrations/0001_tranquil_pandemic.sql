CREATE TABLE IF NOT EXISTS "user_card_guess" (
	"cardId" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_guess_correct" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now(),
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "decks" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "decks" ADD COLUMN "last_played_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_card_guess" ADD CONSTRAINT "user_card_guess_cardId_cards_id_fk" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
