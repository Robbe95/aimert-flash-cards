import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { userCardGuess } from '~/server/entities/userCardGuess.entity'

export const cardGuessSelectSchema = createSelectSchema(userCardGuess)
export const cardGuessInsertSchema = createInsertSchema(userCardGuess)

export type CardGuessSelect = z.infer<typeof cardGuessSelectSchema>
export type CardGuessInsert = z.infer<typeof cardGuessInsertSchema>
