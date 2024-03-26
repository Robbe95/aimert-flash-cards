import { z } from 'zod'

export const deckCreateInput = z.object({
  name: z.string(),
})

export type DeckCreateInput = z.infer<typeof deckCreateInput>
