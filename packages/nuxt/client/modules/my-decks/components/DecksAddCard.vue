<script setup lang="ts">
import { FormInput } from '@wisemen/vue-core'
import type { FieldArray } from 'formango'

import type { CardCreateInput } from '~/shared/models/cards/cardCreate.model'

interface Props {
  cards: FieldArray<CardCreateInput[]>
  index: number
}

const { cards, index } = defineProps<Props>()

const emits = defineEmits<{
  remove: []
}>()

const { t } = useI18n()
const frontText = cards.register(`${index}.frontText`)
const backText = cards.register(`${index}.backText`)
</script>

<template>
  <div class="min-w-[40rem] rounded border border-primary/20 bg-primary/10 p-4">
    <div class="flex items-center justify-between">
      <p class="mb-1 text-lg text-white">
        Card {{ index + 1 }}
      </p>
      <AppIconButton
        icon="minus"
        variant="ghost"
        label="Remove card"
        @click="emits('remove')"
      />
    </div>

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
  </div>
</template>
