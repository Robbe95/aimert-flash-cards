import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { cards } from './cards.entity'

export const decks = pgTable('decks', {
  archivedAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }),
  id: uuid('id').primaryKey().defaultRandom(),
  lastPlayedAt: timestamp('last_played_at', { withTimezone: true }).defaultNow(),
  name: text('name').notNull(),
})

export const deckRelations = relations(decks, ({ many }) => ({
  cards: many(cards),
}))
