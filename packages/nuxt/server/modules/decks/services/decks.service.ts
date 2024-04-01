import { TRPCError } from '@trpc/server'
import {
  and,
  eq,
  inArray,
} from 'drizzle-orm'
import type { z } from 'zod'

import { useDatabase } from '~/server/database/database'
import { cards } from '~/server/entities/cards.entity'
import { decks } from '~/server/entities/decks.entity'
import { userCardGuess } from '~/server/entities/userCardGuess.entity'
import { userDeck } from '~/server/entities/userDeck.entity'
import type { DeckInsert } from '~/server/models/deck.model'
import type { CardCreateInput } from '~/shared/models/cards/cardCreate.model'
import type { CardDeleteInput } from '~/shared/models/cards/cardDelete.model'
import type { CardGuessInput } from '~/shared/models/cards/cardGuess.model'
import type { deckSchema } from '~/shared/models/decks/deck.model'
import type { DeckArchiveInput } from '~/shared/models/decks/deckArchive.model'
import type { DeckDeleteInput } from '~/shared/models/decks/deckDelete.model'
import type { DeckPlayInput } from '~/shared/models/decks/deckPlay.model'

export function useDecksService() {
  const db = useDatabase()

  async function createCard(createCardParams: CardCreateInput) {
    return await db
      .insert(cards)
      .values(createCardParams)
  }

  async function userHasDeck(deckId: string, userId: string) {
    const response = await db
      .select()
      .from(userDeck)
      .where(and(eq(userDeck.deckId, deckId), eq(userDeck.userId, userId)))

    return response.length > 0
  }

  async function getDeck(deckId: string, userId: string) {
    const deck = await db.query.decks.findFirst({
      where: (decks, { eq }) => (eq(decks.id, deckId)),
      with: { cards: {
        with: { guesses: true },
      } },
    })

    if (deck == null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Deck not found',
      })
    }

    return {
      ...deck,
      cards: deck.cards.map(card => ({
        ...card,
        guesses: card.guesses.filter(guess => guess.userId === userId),
      })),
    }
  }

  async function getDecksOfUserId(userId: string): Promise<z.input<typeof deckSchema>[]> {
    const decksQuery = await db
      .select({ deckId: userDeck.deckId })
      .from(userDeck)
      .where(eq(userDeck.userId, userId))

    const deckIds = decksQuery.map(deck => deck.deckId)

    const decks = await db.query.decks.findMany({
      where: (decks, { inArray }) => (inArray(decks.id, deckIds)),
      with: { cards: {
        with: { guesses: true },
      } },
    })

    return decks.map(deck => ({
      ...deck,
      cards: deck.cards.map(card => ({
        ...card,
        guesses: card.guesses.filter(guess => guess.userId === userId),
      })),
    }))
  }

  async function createDeck(createDeckParams: { name: string, userId: string }) {
    const dataObject: DeckInsert = {
      name: createDeckParams.name,
    }

    const deck = (await db
      .insert(decks)
      .values(dataObject)
      .returning())[0]

    await db
      .insert(userDeck)
      .values({
        deckId: deck.id,
        userId: createDeckParams.userId,
      })

    return deck
  }

  async function playDeck(playParams: DeckPlayInput) {
    await db.update(decks)
      .set({ lastPlayedAt: new Date() })
      .where(eq(decks.id, playParams.deckId))

    const cardIdsOfDeck = await db
      .select({ id: cards.id })
      .from(cards)
      .where(eq(cards.deckId, playParams.deckId))

    await db
      .delete(userCardGuess)
      .where(inArray(userCardGuess.cardId, cardIdsOfDeck.map(card => card.id)))
  }

  async function guessCard(cardGuessParams: CardGuessInput, userId: string) {
    const insertValues = {
      cardId: cardGuessParams.cardId,
      isGuessCorrect: cardGuessParams.isCorrect,
      userId,
    }

    const response = await db
      .insert(userCardGuess)
      .values(insertValues)
      .returning()

    return response[0]
  }

  async function deleteDeck({ deckId }: DeckDeleteInput) {
    await db
      .delete(userDeck)
      .where(eq(userDeck.deckId, deckId))

    await db
      .delete(decks)
      .where(eq(decks.id, deckId))
  }

  async function deleteCard({ cardId }: CardDeleteInput) {
    await db
      .delete(userCardGuess)
      .where(eq(userCardGuess.cardId, cardId))

    await db
      .delete(cards)
      .where(eq(cards.id, cardId))
  }

  async function archiveDeck({ deckId }: DeckArchiveInput) {
    await db
      .update(decks)
      .set({ archivedAt: new Date() })
      .where(eq(decks.id, deckId))
  }

  return {
    archiveDeck,
    createCard,
    createDeck,
    deleteCard,
    deleteDeck,
    getDeck,
    getDecksOfUserId,
    guessCard,
    playDeck,
    userHasDeck,
  }
}
