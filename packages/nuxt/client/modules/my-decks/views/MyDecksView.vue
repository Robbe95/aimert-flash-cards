<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  decks: Deck
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
  <div>
    {{ decks }}
    <AppButton @click="onCreateDeck">
      Create Deck
    </AppButton>
  </div>
</template>
