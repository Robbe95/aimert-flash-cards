import {
  pgTable,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { decks } from './decks.entity'

export const userDeck = pgTable('user_deck', {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  deckId: uuid('deckId').notNull()
    .references(() => decks.id, { onDelete: 'no action', onUpdate: 'no action' }),
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
})
