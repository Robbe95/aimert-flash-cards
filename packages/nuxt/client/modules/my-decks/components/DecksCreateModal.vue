<script setup lang="ts">
import {
  AppDialog, FormInput,
} from '@wisemen/vue-core'
import { useForm } from 'formango'

import { deckCreateInput } from '~/shared/models/decks/deckCreate.model'

import { useCreateDeckMutation } from '../api/mutations/useCreateDeckMutation'

const emits = defineEmits<{
  close: []
}>()
const { t } = useI18n()
const createDeckMutation = useCreateDeckMutation()
const { form, onSubmitForm } = useForm({
  schema: deckCreateInput,
})

onSubmitForm(async (values) => {
  await createDeckMutation.mutateAsync(values)
  emits('close')
})

const name = form.register('name')
</script>

<template>
  <AppDialog
    accessible-description="lala"
    accessible-title="lala"
  >
    <div class="flex min-w-[400px] flex-col gap-2 p-4 text-black">
      <AppDialogHeader
        :description="t('create_deck.description')"
        :title="t('create_deck.title')"
      />
      <FormInput
        :label="t('create_deck.name')"
        :placeholder="t('create_deck.name')"
        v-bind="name"
      />

      <AppButton
        class="w-full"
        @click="form.submit"
      >
        {{ t('create_deck.submit') }}
      </AppButton>
    </div>
  </AppDialog>
</template>
