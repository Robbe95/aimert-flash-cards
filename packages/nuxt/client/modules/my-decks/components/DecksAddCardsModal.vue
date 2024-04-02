<script setup lang="ts">
import { AppDialog } from '@wisemen/vue-core'
import { useForm } from 'formango'

import { useCreateCardsMutation } from '~/client/modules/my-decks/api/mutations/useCreateCardsMutation'
import { cardsCreateInput } from '~/shared/models/cards/cardCreate.model'

const props = defineProps<{
  deckId: string
}>()

const emits = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const { form, onSubmitForm } = useForm({
  initialState: {
    cards: [
      {
        backText: '',
        frontText: '',
      },
    ],
    deckId: props.deckId,
  },
  schema: cardsCreateInput,
})
const createCardsMutation = useCreateCardsMutation()

const cards = form.registerArray('cards')

function onRemoveCard(index: number): void {
  cards.remove(index)
}

function onAddCard(): void {
  cards.append()
}

onSubmitForm(async (values) => {
  await createCardsMutation.mutateAsync(values)
  emits('close')
})
</script>

<template>
  <AppDialog
    accessible-description="lala"
    accessible-title="lala"
  >
    <div class="flex min-w-[400px] flex-col gap-2 bg-black p-4 text-white">
      <AppDialogHeader
        :description="t('create_deck.description')"
        :title="t('create_deck.title')"
      />

      <div class="flex max-h-[75vh] flex-col gap-4 overflow-auto p-4 text-black">
        <DecksAddCard
          v-for="(emailField, key) in cards.fields"
          :key="emailField"
          :cards="cards"
          :index="key"
          @remove="onRemoveCard(key)"
        />
      </div>
      <div class="flex flex-col gap-2">
        <AppButton
          class="w-full"
          variant="outline"
          @click="onAddCard"
        >
          {{ t('create_card.add_card') }}
        </AppButton>

        <AppButton
          :is-loading="createCardsMutation.isPending.value"
          class="w-full"
          icon-right="checkmark"
          @click="form.submit"
        >
          {{ t('create_cards.submit') }}
        </AppButton>
      </div>
    </div>
  </AppDialog>
</template>
