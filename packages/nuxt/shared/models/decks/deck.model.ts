import type { z } from 'zod'

import { deckSelectSchema } from '~/server/modules/decks/models/deck.model'

export const deck = deckSelectSchema.transform(data => ({
  ...data,
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
}))

export type Deck = z.infer<typeof deck>
