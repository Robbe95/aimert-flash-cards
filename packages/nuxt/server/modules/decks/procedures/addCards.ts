import { TRPCError } from '@trpc/server'

import { authProcedure } from '~/server/trpc/trpc'
import { cardsCreateInput } from '~/shared/models/cards/cardCreate.model'

import { useDecksService } from '../services/decks.service'

export const addCards = authProcedure
  .input(cardsCreateInput)
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()

    const userHasDeck = await decksService.userHasDeck(ctx.user.id, input.deckId)

    if (userHasDeck) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Deck not found',
      })
    }

    const deckResponse = await decksService.createCards(input)

    return deckResponse
  })
