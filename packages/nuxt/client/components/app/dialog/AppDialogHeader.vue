<script setup lang="ts">
import {
  AppDialogDescription,
  AppDialogTitle,
  AppText,
} from '@wisemen/vue-core'

interface Props {
  description: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <AppDialogTitle>
      <AppText
        as="h2"
        variant="heading"
        class="text-black"
      >
        {{ title }}
      </AppText>
    </AppDialogTitle>
    <AppDialogDescription>
      <AppText
        as="h2"
        variant="body"
        class="text-neutral-500"
      >
        {{ description }}
      </AppText>
    </AppDialogDescription>
  </div>
</template>
