import { z } from 'zod'

import { cardSelectSchema } from '~/server/models/card.model'
import { cardGuessSelectSchema } from '~/server/models/cardGuess.model'

export const cardGuessSchema = cardGuessSelectSchema.extend({
  createdAt: z.string().or(z.date()),
}).transform(data => ({
  ...data,
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
}))

export const cardSchema = cardSelectSchema.extend({
  createdAt: z.string().or(z.date()),
  guesses: cardGuessSchema.array(),
}).transform(data => ({
  ...data,
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
}))

export type Card = z.infer<typeof cardSchema>
