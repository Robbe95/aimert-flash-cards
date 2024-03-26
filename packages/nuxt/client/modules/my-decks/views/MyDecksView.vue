<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  decks: Deck[]
}

defineProps<Props>()

const dialog = useDialog({
  component: () => import('../components/MyDecksCreateModal.vue'),
})

function onCreateDeck() {
  void dialog.openDialog()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
      <AppCard
        v-for="deck in decks"
        :key="deck.id"
        :title="deck.name"
        :description="deck.name"
        class="border px-12 py-8"
      />
    </div>

    <AppButton @click="onCreateDeck">
      Create Deck
    </AppButton>
  </div>
</template>
