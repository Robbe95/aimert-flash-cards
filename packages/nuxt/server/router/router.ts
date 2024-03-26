import { authRouter } from '~/server/modules/auth/routers/auth.router'
import { decksRouter } from '~/server/modules/decks/routers/decks.router'
import { router } from '~/server/trpc/trpc'

export const appRouter = router({
  auth: authRouter,
  decks: decksRouter,
})

export type AppRouter = typeof appRouter
