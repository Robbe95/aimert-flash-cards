import { z } from 'zod'

export const deckGetInput = z.object({
  deckId: z.string(),
})

export type DeckGetInput = z.infer<typeof deckGetInput>
