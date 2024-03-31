import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { decks } from '~/server/entities/decks.entity'
import { cardSelectSchema } from '~/server/models/card.model'

export const deckSelectSchema = createSelectSchema(decks)
export const deckInsertSchema = createInsertSchema(decks)
export const deckSelectSchemaWithCards = deckSelectSchema.extend({
  cards: cardSelectSchema.array(),
})

export type DeckSelect = z.infer<typeof deckSelectSchema>
export type DeckInsert = z.infer<typeof deckInsertSchema>
