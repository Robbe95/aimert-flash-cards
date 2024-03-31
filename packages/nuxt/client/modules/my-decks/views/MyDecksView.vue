<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  decks: Deck[]
}

defineProps<Props>()

const dialog = useDialog({
  animateFromTrigger: true,
  component: () => import('../components/DecksCreateModal.vue'),
})

function onCreateDeck() {
  void dialog.openDialog({
    onClose: () => {
      dialog.closeDialog()
    },
  })
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
      >
        <NuxtLinkLocale
          :to="`/my-decks/${deck.id}`"
        >
          View Deck
        </NuxtLinkLocale>
      </AppCard>
    </div>

    <div>
      <AppButton
        :id="dialog.triggerId"
        @click="onCreateDeck"
      >
        Create Deck
      </AppButton>
    </div>
  </div>
</template>
