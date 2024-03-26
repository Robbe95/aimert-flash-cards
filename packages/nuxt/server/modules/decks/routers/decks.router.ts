import { router } from '~/server/trpc/trpc'

import { createDeck } from '../procedures/createDeck'
import { getDecks } from '../procedures/getDecks'

export const decksRouter = router({
  createDeck,
  getDecks,
})
