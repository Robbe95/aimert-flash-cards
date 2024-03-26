<script setup lang="ts">
import { AppDialogContainer } from '@wisemen/vue-core'
import { ConfigProvider } from 'radix-vue'

function useIdFunction() {
  return useId()
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <AppDialogContainer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
