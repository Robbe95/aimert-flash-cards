import { authProcedure } from '~/server/trpc/trpc'
import { deckCreateInput } from '~/shared/models/decks/deckCreate.model'

import { useDecksService } from '../services/decks.service'

export const createDeck = authProcedure
  .input(deckCreateInput)
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()
    const deckResponse = await decksService.createDeck({
      name: input.name,
      userId: ctx.user.id,
    })

    return deckResponse
  })
