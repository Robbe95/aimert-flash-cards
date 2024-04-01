<script setup lang="ts">
import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  deck: Deck
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="card in deck.cards"
        :key="card.id"
        class="grid grid-cols-2 rounded border-2 border-primary bg-black p-4 text-white"
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
    <div class="flex items-center justify-center">
      <DecksAddCard
        :deck-id="deck.id"
        class="min-w-96"
      />
    </div>
  </div>
</template>
