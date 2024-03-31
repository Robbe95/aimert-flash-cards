import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import type { CardCreateInput } from '~/shared/models/cards/cardCreate.model'

export function useCreateCardMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CardCreateInput) => {
      const { trpc } = useTrpc()

      const decks = await trpc.decks.addCard.mutate(input)

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
