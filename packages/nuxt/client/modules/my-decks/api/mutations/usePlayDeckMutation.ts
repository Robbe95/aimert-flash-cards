import { useMutation } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import type { DeckPlayInput } from '~/shared/models/decks/deckPlay.model'

export function usePlayDeckMutation() {
  return useMutation({
    mutationFn: async (input: DeckPlayInput) => {
      const { trpc } = useTrpc()

      const guess = await trpc.decks.playDeck.mutate(input)

      return guess
    },
  })
}
