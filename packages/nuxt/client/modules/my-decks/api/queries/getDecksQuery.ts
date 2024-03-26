import { useQuery } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'

export function getDecksQuery() {
  return useQuery({
    queryFn: async () => {
      const { trpc } = useTrpc()

      const decks = await trpc.decks.getDecks.query()

      return decks
    },
    queryKey: [
      'decks',
    ],
  })
}
