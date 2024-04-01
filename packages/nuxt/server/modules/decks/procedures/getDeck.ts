import { TRPCError } from '@trpc/server'

import { authProcedure } from '~/server/trpc/trpc'
import { deckGetInput } from '~/shared/models/decks/deckGet.model'

import { useDecksService } from '../services/decks.service'

export const getDeck = authProcedure
  .input(deckGetInput)
  .query(async ({ ctx, input }) => {
    const decksService = useDecksService()

    const userHasDeck = await decksService.userHasDeck(ctx.user.id, input.deckId)

    if (userHasDeck) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Deck not found',
      })
    }

    const userDeck = await decksService.getDeck(input.deckId, ctx.user.id)

    return userDeck
  })
