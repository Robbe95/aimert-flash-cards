import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as CardsSchema from '~/server/entities/cards.entity'
import * as DecksSchema from '~/server/entities/decks.entity'
import * as UserCardGuessSchema from '~/server/entities/userCardGuess.entity'
import * as UserDeckSchema from '~/server/entities/userDeck.entity'

export function useDatabase() {
  const runtimeConfig = useRuntimeConfig()

  const connectionString = runtimeConfig.dbUrl

  const client = postgres(connectionString)
  const db = drizzle(client, {
    schema: {
      ...CardsSchema,
      ...DecksSchema,
      ...UserCardGuessSchema,
      ...UserDeckSchema,
    },
  })

  return db
}
