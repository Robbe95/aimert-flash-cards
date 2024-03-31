import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { cards } from '~/server/entities/cards.entity'
import { cardGuessSelectSchema } from '~/server/models/cardGuess.model'

export const cardSelectSchema = createSelectSchema(cards)
export const cardInsertSchema = createInsertSchema(cards)
export const cardSelectSchemaWithGuesses = cardSelectSchema.extend({
  guesses: cardGuessSelectSchema.array(),
})

export type CardSelect = z.infer<typeof cardSelectSchema>
export type CardInsert = z.infer<typeof cardInsertSchema>
