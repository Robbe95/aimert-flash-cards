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
        class="min-h-40 rounded bg-white p-4 text-black"
      >
        <h1 class="text-lg">
          {{ card.frontText }}
        </h1>
        <p class="text-lg">
          {{ card.backText }}
        </p>
      </div>
      <DecksAddCard :deck-id="deck.id" />
    </div>
  </div>
</template>
