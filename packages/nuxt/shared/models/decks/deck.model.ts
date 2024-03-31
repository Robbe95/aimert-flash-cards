import { z } from 'zod'

import { deckSelectSchemaWithCards } from '~/server/models/deck.model'
import { cardSchema } from '~/shared/models/cards/card.model'

export const deckSchema = deckSelectSchemaWithCards.extend({
  archivedAt: z.string().nullable().or(z.date().nullable()),
  cards: z.array(cardSchema),
  createdAt: z.string().or(z.date()),
  lastPlayedAt: z.string().nullable().or(z.date().nullable()),
}).transform(data => ({
  ...data,
  archivedAt: data.archivedAt != null ? new Date(data.archivedAt) : null,
  cards: data.cards.map(card => cardSchema.parse(card)),
  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
  lastPlayedAt: data.lastPlayedAt != null ? new Date(data.lastPlayedAt) : null,
}))

export type Deck = z.infer<typeof deckSchema>
