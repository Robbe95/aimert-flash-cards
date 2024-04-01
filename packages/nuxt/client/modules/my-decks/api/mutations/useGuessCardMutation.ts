import { useMutation } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import type { CardGuessInput } from '~/shared/models/cards/cardGuess.model'

export function useGuessCardMutation() {
  return useMutation({
    mutationFn: async (input: CardGuessInput) => {
      const { trpc } = useTrpc()

      const guess = await trpc.decks.guessCard.mutate(input)

      return guess
    },
  })
}
