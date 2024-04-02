<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import { useActions } from '~/client/composables/actions/useActions'
import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  deck: Deck
}

const { deck } = defineProps<Props>()

const { setActions } = useActions()
const dialog = useDialog({
  animateFromTrigger: true,
  component: () => import('../components/DecksAddCardsModal.vue'),
})

function onCreateDeck() {
  void dialog.openDialog({
    deckId: deck.id,
    onClose: () => {
      dialog.closeDialog()
    },
  })
}

setActions([
  {
    icon: 'minus',
    id: dialog.triggerId,
    label: 'Create Cards',
    onAction: onCreateDeck,
    variant: 'default',
  },
])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="card in deck.cards"
        :key="card.id"
        class="grid grid-cols-2 rounded border-2 border-primary/40 bg-black p-4 text-white"
      >
        <p class="text-neutral-400">
          Text on the front:
        </p>
        <p class="text-right text-lg">
          {{ card.frontText }}
        </p>
        <p class="text-neutral-400">
          Text on the back:
        </p>
        <p class="text-right text-lg">
          {{ card.backText }}
        </p>
      </div>
    </div>
  </div>
</template>
