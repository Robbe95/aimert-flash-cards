import { z } from 'zod'

export const cardGuessInput = z.object({
  cardId: z.string(),
  isCorrect: z.boolean(),
})

export type CardGuessInput = z.infer<typeof cardGuessInput>
