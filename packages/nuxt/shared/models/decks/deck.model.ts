import { z } from 'zod'

import { deckSelectSchemaWithCards } from '~/server/models/deck.model'
import { cardSchema } from '~/shared/models/cards/card.model'

export const deckSchema = deckSelectSchemaWithCards.extend({
  archivedAt: z.string().nullable().or(z.date().nullable()),
  cards: z.array(cardSchema),
  createdAt: z.string().nullable().or(z.date().nullable()),
  lastPlayedAt: z.string().nullable().or(z.date().nullable()),
}).transform(data => ({
  ...data,
  archivedAt: data.archivedAt != null ? new Date(data.archivedAt) : null,
  cards: data.cards.map(card => cardSchema.parse(card)),

  createdAt: data.createdAt != null ? new Date(data.createdAt) : new Date(),
  lastPlayedAt: data.lastPlayedAt != null ? new Date(data.lastPlayedAt) : null,
}))

export const deckSchemaWithCounts = deckSchema.transform(data => ({
  ...data,
  correctCardsAmount: data.cards.filter(
    card => card.guesses?.[0]?.isGuessCorrect != null && card.guesses[0].isGuessCorrect,
  ).length,
  incorrectCardsAmount: data.cards.filter(
    card => card.guesses?.[0]?.isGuessCorrect != null && !card.guesses[0].isGuessCorrect,
  ).length,
  playedCardsAmount: data.cards.filter(card => card.guesses.length > 0).length,
  unplayedCardsAmount: data.cards.filter(card => card.guesses.length === 0).length,
}))

export type Deck = z.infer<typeof deckSchema>
export type DeckWithCounts = z.infer<typeof deckSchemaWithCounts>
