import { authProcedure } from '~/server/trpc/trpc'
import { deck } from '~/shared/models/decks/deck.model'

import { useDecksService } from '../services/decks.service'

export const getDecks = authProcedure
  .output(deck.array())
  .query(async ({ ctx }) => {
    const decksService = useDecksService()
    const deckResponse = await decksService.getDecksOfUserId(ctx.user.id)

    const decks = deckResponse.map(deck => ({
      ...deck.decks,
    }))

    return decks
  })
