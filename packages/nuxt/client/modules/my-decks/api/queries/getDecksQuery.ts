import { useQuery } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import { deckSchema } from '~/shared/models/decks/deck.model'

export function getDecksQuery() {
  return useQuery({
    queryFn: async () => {
      const { trpc } = useTrpc()

      try {
        const decks = await trpc.decks.getDecks.query()

        return decks.map(deck => deckSchema.parse(deck))
      }
      catch (error) {
        console.error('Error validating query', error)

        throw error
      }
    },
    queryKey: [
      'decks',
    ],
  })
}
