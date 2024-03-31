import { z } from 'zod'

export const cardCreateInput = z.object({
  backText: z.string(),
  deckId: z.string(),
  frontText: z.string(),
})

export type CardCreateInput = z.infer<typeof cardCreateInput>
