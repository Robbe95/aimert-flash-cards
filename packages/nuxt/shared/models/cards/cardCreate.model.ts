import { z } from 'zod'

export const cardCreateInput = z.object({
  backText: z.string().min(1),
  frontText: z.string().min(1),
})

export const cardsCreateInput = z.object({
  cards: z.array(cardCreateInput),
  deckId: z.string(),
})

export type CardCreateInput = z.infer<typeof cardCreateInput>
export type CardsCreateInput = z.infer<typeof cardsCreateInput>
