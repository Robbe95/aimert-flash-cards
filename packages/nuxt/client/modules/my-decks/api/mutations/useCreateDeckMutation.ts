import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import type { DeckCreateInput } from '~/shared/models/decks/deckCreate.model'

export function useCreateDeckMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: DeckCreateInput) => {
      const { trpc } = useTrpc()

      const decks = await trpc.decks.createDeck.mutate(input)

      return decks
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [
          'decks',
        ],
      })
    },
  })
}
