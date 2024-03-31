import { relations } from 'drizzle-orm'
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { cards } from './cards.entity'

export const userCardGuess = pgTable('user_card_guess', {
  cardId: uuid('cardId').notNull()
    .references(() => cards.id, { onDelete: 'no action', onUpdate: 'no action' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  id: uuid('id').primaryKey().defaultRandom(),
  isGuessCorrect: boolean('is_guess_correct').default(false),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  userId: uuid('user_id').notNull(),
})

export const userCardGuessRelations = relations(userCardGuess, ({ one }) => ({
  card: one(cards, {
    fields: [
      userCardGuess.cardId,
    ],
    references: [
      cards.id,
    ],
  }),
}))
