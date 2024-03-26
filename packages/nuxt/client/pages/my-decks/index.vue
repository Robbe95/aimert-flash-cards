<script setup lang="ts">
import { getDecksQuery } from '~/client/modules/my-decks/api/queries/getDecksQuery'

definePageMeta({
  middleware: 'auth-middleware',
  title: 'Deckies',
})

const { data, suspense } = getDecksQuery()

await suspense()
</script>

<template>
  <MyDecksView
    v-if="data != null"
    :concerts="data"
  />
</template>
