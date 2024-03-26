import { z } from 'zod'

import { authProcedure } from '~/server/trpc/trpc'

import { useDecksService } from '../services/decks.service'

export const createDeck = authProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()
    const deckResponse = await decksService.createDeck({
      name: input.name,
      userId: ctx.user.id,
    })

    return deckResponse
  })
