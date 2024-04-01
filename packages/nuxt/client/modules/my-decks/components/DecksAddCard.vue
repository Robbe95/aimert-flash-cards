<script setup lang="ts">
import { FormInput } from '@wisemen/vue-core'
import { useForm } from 'formango'

import { useCreateCardMutation } from '~/client/modules/my-decks/api/mutations/useCreateCardMutation'
import { cardCreateInput } from '~/shared/models/cards/cardCreate.model'

const props = defineProps<{
  deckId: string
}>()

const { t } = useI18n()
const { form, onSubmitForm } = useForm({
  initialState: {
    backText: null,
    deckId: props.deckId,
    frontText: null,
  },
  schema: cardCreateInput,
})
const createDeckMutation = useCreateCardMutation()

onSubmitForm(async (values) => {
  await createDeckMutation.mutateAsync(values)
  form.setValues({
    backText: undefined,
    frontText: undefined,
  })
})

const backText = form.register('backText')
const frontText = form.register('frontText')
</script>

<template>
  <div class="flex flex-col gap-4 p-4 text-black">
    <FormInput
      :label="t('create_card.front_text')"
      :placeholder="t('create_card.front_text')"
      v-bind="frontText"
    />
    <FormInput
      :label="t('create_card.back_text')"
      :placeholder="t('create_card.back_text')"
      v-bind="backText"
    />

    <AppButton
      :is-loading="createDeckMutation.isPending.value"
      class="w-full"
      icon-right="checkmark"
      @click="form.submit"
    >
      {{ t('create_deck.submit') }}
    </AppButton>
  </div>
</template>
