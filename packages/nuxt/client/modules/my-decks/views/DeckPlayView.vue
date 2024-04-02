<script setup lang="ts">
import { useGuessCardMutation } from '~/client/modules/my-decks/api/mutations/useGuessCardMutation'
import type { Card } from '~/shared/models/cards/card.model'
import type { Deck } from '~/shared/models/decks/deck.model'

interface Props {
  deck: Deck
}

const { deck } = defineProps<Props>()

function getUncompletedCards(cards: Card[]) {
  return cards.filter(card => card.guesses.length === 0)
}

function shuffleCards(cards: Card[]) {
  const shuffled = [
    ...cards,
  ].sort(() => Math.random() - 0.5)

  return shuffled
}

const guessCardMutation = useGuessCardMutation()
const uncompletedCards = computed<Card[]>(() => getUncompletedCards(deck.cards))
const shuffledCards = ref<Card[]>(shuffleCards(uncompletedCards.value))
const currentCardIndex = ref<number>(0)
const currentCard = computed<Card | null>(() => shuffledCards.value[currentCardIndex.value])
const hasNextCard = computed<boolean>(() => currentCardIndex.value < shuffledCards.value.length - 1)
const hasPreviousCard = computed<boolean>(() => currentCardIndex.value > 0)

function nextCard() {
  if (!hasNextCard.value) {
    return
  }

  currentCardIndex.value += 1
}

function previousCard() {
  if (!hasPreviousCard.value) {
    return
  }

  currentCardIndex.value -= 1
}

function guessCard(isCorrect: boolean) {
  if (currentCard.value == null) {
    return
  }

  void guessCardMutation.mutateAsync({
    cardId: currentCard.value.id,
    isCorrect,
  })

  nextCard()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <DecksFlipCard v-if="currentCard">
      <template #front>
        {{ currentCard.frontText }}
      </template>
      <template #back>
        {{ currentCard.backText }}
      </template>
    </DecksFlipCard>
    <div class="flex gap-2">
      <AppButton @click="guessCard(true)">
        Correct
      </AppButton>
      <AppButton @click="guessCard(false)">
        Incorrect
      </AppButton>
    </div>
    <div class="flex gap-2">
      <AppButton @click="nextCard()">
        Skip
      </AppButton>
      <AppButton @click="previousCard()">
        Back
      </AppButton>
    </div>
  </div>
</template>
