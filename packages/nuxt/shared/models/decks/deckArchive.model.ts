import { z } from 'zod'

export const deckArchiveInput = z.object({
  deckId: z.string(),
})

export type DeckArchiveInput = z.infer<typeof deckArchiveInput>
