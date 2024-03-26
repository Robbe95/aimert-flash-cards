import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { decks } from '~/server/entities/decks.entity'

export const deckSelectSchema = createSelectSchema(decks)
export const deckInsertSchema = createInsertSchema(decks)

export type DeckSelect = z.infer<typeof deckSelectSchema>
export type DeckInsert = z.infer<typeof deckInsertSchema>
