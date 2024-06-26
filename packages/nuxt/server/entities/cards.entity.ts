import { relations } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { decks } from './decks.entity'
import { userCardGuess } from './userCardGuess.entity'

export const cards = pgTable('cards', {
  backText: text('back_text').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  deckId: uuid('deck_id').notNull()
    .references(() => decks.id, { onDelete: 'no action', onUpdate: 'no action' }),
  frontText: text('front_text').notNull(),
  hasFailed: boolean('has_failed').default(false),
  id: uuid('id').primaryKey().defaultRandom(),
})

export const cardsRelations = relations(cards, ({ many, one }) => ({
  deck: one(decks, {
    fields: [
      cards.deckId,
    ],
    references: [
      decks.id,
    ],
  }),
  guesses: many(userCardGuess),

}))
