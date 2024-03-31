import { z } from 'zod'

export const cardDeleteInput = z.object({
  cardId: z.string(),
})

export type CardDeleteInput = z.infer<typeof cardDeleteInput>
