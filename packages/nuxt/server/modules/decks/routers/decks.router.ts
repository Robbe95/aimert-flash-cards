import { router } from '~/server/trpc/trpc'

import { addCards } from '../procedures/addCards'
import { createDeck } from '../procedures/createDeck'
import { getDeck } from '../procedures/getDeck'
import { getDecks } from '../procedures/getDecks'
import { guessCard } from '../procedures/guessCard'
import { playDeck } from '../procedures/playDeck'

export const decksRouter = router({
  addCards,
  createDeck,
  getDeck,
  getDecks,
  guessCard,
  playDeck,
})
