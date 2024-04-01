<script setup lang="ts">
import { usePlayDeckMutation } from '~/client/modules/my-decks/api/mutations/usePlayDeckMutation'
import { getDeckQuery } from '~/client/modules/my-decks/api/queries/getDeckQuery'

definePageMeta({
  middleware: 'auth-middleware',
  title: 'Deckies',
})

const route = useRoute()

const playDeckMutation = usePlayDeckMutation()
const { data, suspense } = getDeckQuery({ deckId: route.params.deckid })

await playDeckMutation.mutateAsync({ deckId: route.params.deckid })
await suspense()
</script>

<template>
  <DeckPlayView
    v-if="data != null"
    :deck="data"
  />
</template>
