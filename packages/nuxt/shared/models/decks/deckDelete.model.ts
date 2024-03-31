import { z } from 'zod'

export const deckDeleteInput = z.object({
  deckId: z.string(),
})

export type DeckDeleteInput = z.infer<typeof deckDeleteInput>
