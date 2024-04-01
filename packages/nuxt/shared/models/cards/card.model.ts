import { z } from 'zod'

import { cardSelectSchema } from '~/server/models/card.model'
import { cardGuessSelectSchema } from '~/server/models/cardGuess.model'

export const cardGuessSchema = cardGuessSelectSchema.extend({
  createdAt: z.string().nullable().or(z.date().nullable()),
  updatedAt: z.string().nullable().or(z.date().nullable()),
}).transform(data => ({
  ...data,
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
  updatedAt: data.updatedAt != null ? new Date(data.updatedAt) : new Date(),

}))

export const cardSchema = cardSelectSchema.extend({
  createdAt: z.string().nullable().or(z.date().nullable()),
  guesses: z.array(cardGuessSchema),
}).transform(data => ({
  ...data,
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
  guesses: data.guesses.map(guess => cardGuessSchema.parse(guess)),
}))

export type Card = z.infer<typeof cardSchema>
