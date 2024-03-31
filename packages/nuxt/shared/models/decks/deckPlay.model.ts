import { z } from 'zod'

export const deckPlayInput = z.object({
  deckId: z.string(),
})

export type DeckPlayInput = z.infer<typeof deckPlayInput>
