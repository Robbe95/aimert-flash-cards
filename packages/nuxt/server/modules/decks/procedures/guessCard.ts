import { authProcedure } from '~/server/trpc/trpc'
import { cardGuessInput } from '~/shared/models/cards/cardGuess.model'

import { useDecksService } from '../services/decks.service'

export const guessCard = authProcedure
  .input(cardGuessInput)
  .mutation(async ({ ctx, input }) => {
    const decksService = useDecksService()

    const deckResponse = await decksService.guessCard(cardGuessInput, ctx.user.id)

    return deckResponse
  })
