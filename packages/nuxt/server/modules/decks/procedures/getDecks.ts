import { authProcedure } from '~/server/trpc/trpc'
import { deckSchema } from '~/shared/models/decks/deck.model'

import { useDecksService } from '../services/decks.service'

export const getDecks = authProcedure
  .output(deckSchema.array())
  .query(async ({ ctx }) => {
    const decksService = useDecksService()
    const deckResponse = await decksService.getDecksOfUserId(ctx.user.id)

    return deckResponse
  })
