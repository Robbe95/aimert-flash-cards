<script setup lang="ts">
import { useDialog } from '@wisemen/vue-core'

import { button } from '~/client/components/app/button/button.style'
import type { DeckWithCounts } from '~/shared/models/decks/deck.model'

interface Props {
  decks: DeckWithCounts[]
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
        <div class="grid grid-cols-2 justify-end">
          <div class="text-neutral-500">
            Correct guesses:
          </div>
          <div class="text-end text-success">
            {{ deck.correctCardsAmount }} / {{ deck.playedCardsAmount }}
          </div>
          <div class="text-neutral-500">
            Incorrect guesses:
          </div>
          <div class="text-end text-destructive">
            {{ deck.incorrectCardsAmount }} / {{ deck.playedCardsAmount }}
          </div>
          <div class="text-neutral-500">
            Unplayed cards:
          </div>
          <div class="text-end text-neutral-500">
            {{ deck.unplayedCardsAmount }}
          </div>
          <div class="text-neutral-500">
            Total cards:
          </div>
          <div class="text-end text-primary">
            {{ deck.cards.length }}
          </div>
        </div>
        <div class="mt-4 flex w-full flex-col gap-2">
          <NuxtLinkLocale
            :to="`/my-decks/${deck.id}/play`"
            :class="button()"
          >
            Play Deck
          </NuxtLinkLocale>
          <NuxtLinkLocale
            :to="`/my-decks/${deck.id}`"
            :class="button({
              variant: 'outline',
            })"
          >
            View Deck
          </NuxtLinkLocale>
        </div>
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
