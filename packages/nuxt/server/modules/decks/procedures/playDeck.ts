import { TRPCError } from '@trpc/server'

import { authProcedure } from '~/server/trpc/trpc'
import { deckPlayInput } from '~/shared/models/decks/deckPlay.model'

import { useDecksService } from '../services/decks.service'

export const playDeck = authProcedure
  .input(deckPlayInput)
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()

    const userHasDeck = await decksService.userHasDeck(ctx.user.id, input.deckId)

    if (userHasDeck) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Deck not found',
      })
    }

    await decksService.playDeck({
      deckId: input.deckId,
    })

    return null
  })
