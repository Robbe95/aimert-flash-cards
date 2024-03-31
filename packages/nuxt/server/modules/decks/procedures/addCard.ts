import { TRPCError } from '@trpc/server'

import { authProcedure } from '~/server/trpc/trpc'
import { cardCreateInput } from '~/shared/models/cards/cardCreate.model'

import { useDecksService } from '../services/decks.service'

export const addCard = authProcedure
  .input(cardCreateInput)
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()

    const userHasDeck = await decksService.userHasDeck(ctx.user.id, input.deckId)

    if (userHasDeck) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Deck not found',
      })
    }

    const deckResponse = await decksService.createCard({
      backText: input.backText,
      deckId: input.deckId,
      frontText: input.frontText,
    })

    return deckResponse
  })
