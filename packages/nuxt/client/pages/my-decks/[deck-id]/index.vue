<script setup lang="ts">
import { getDeckQuery } from '~/client/modules/my-decks/api/queries/getDeckQuery'
import DeckView from '~/client/modules/my-decks/views/DeckView.vue'

definePageMeta({
  middleware: 'auth-middleware',
  title: 'Deckies',
})

const route = useRoute()

const { data, suspense } = getDeckQuery({ deckId: route.params.deckid })

await suspense()
</script>

<template>
  <DeckView
    v-if="data != null"
    :deck="data"
  />
</template>
