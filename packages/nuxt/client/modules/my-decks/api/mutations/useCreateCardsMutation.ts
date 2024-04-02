import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import type { CardsCreateInput } from '~/shared/models/cards/cardCreate.model'

export function useCreateCardsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CardsCreateInput) => {
      const { trpc } = useTrpc()

      const decks = await trpc.decks.addCards.mutate(input)

      return decks
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [
          'decks',
        ],
      })
      void queryClient.invalidateQueries({
        queryKey: [
          'deck',
          variables.deckId,
        ],
      })
    },
  })
}
