import { eq } from 'drizzle-orm'

import { useDatabase } from '~/server/database/database'
import { decks } from '~/server/entities/decks.entity'
import { userDeck } from '~/server/entities/userDeck.entity'
import type { DeckInsert } from '~/server/modules/decks/models/deck.model'

export function useDecksService() {
  const db = useDatabase()

  async function getDecksOfUserId(userId: string) {
    return await db
      .select()
      .from(decks)
      .leftJoin(userDeck, eq(userDeck.deckId, decks.id))
      .where(eq(userDeck.userId, userId))
  }

  async function createDeck(createDeckParams: { name: string, userId: string }) {
    const dataObject: DeckInsert = {
      name: createDeckParams.name,
    }

    const deck = await db
      .insert(decks)
      .values(dataObject)

      .returning()

    console.warn(deck)
  }

  return {
    createDeck,
    getDecksOfUserId,
  }
}
