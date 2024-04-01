import { useQuery } from '@tanstack/vue-query'

import { useTrpc } from '~/client/api/useTrpc'
import { deckSchemaWithCounts } from '~/shared/models/decks/deck.model'
import type { DeckGetInput } from '~/shared/models/decks/deckGet.model'

export function getDeckQuery(input: DeckGetInput) {
  return useQuery({
    queryFn: async () => {
      try {
        const { trpc } = useTrpc()

        const deck = await trpc.decks.getDeck.query(input)

        return deckSchemaWithCounts.parse(deck)
      }
      catch (error) {
        console.error('Error validating query', error)

        throw error
      }
    },
    queryKey: [
      'deck',
      input.deckId,
    ],
  })
}
