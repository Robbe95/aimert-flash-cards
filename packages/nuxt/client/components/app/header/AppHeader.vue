<script setup lang="ts">
import { useActions } from '~/client/composables/actions/useActions'

const { actions } = useActions()
</script>

<template>
  <header class="border-b border-b-primary/40 text-white">
    <div class="container mx-auto flex w-full items-center justify-between gap-6 px-4 py-8 text-white">
      <div class="flex items-center gap-4">
        <NuxtLinkLocale
          to="/my-decks"
          class="group max-w-max"
        >
          <div class="max-w-max border-b border-transparent duration-200 hover:border-primary group-[.router-link-active]:border-primary">
            My decks
          </div>
        </NuxtLinkLocale>
        <NuxtLinkLocale
          to="/"
          class="group max-w-max"
        >
          <div class="max-w-max border-b border-transparent duration-200 hover:border-primary group-[.router-link-active]:border-primary">
            Archived decks (coming soon)
          </div>
        </NuxtLinkLocale>
      </div>
      <div class="flex items-center gap-2">
        <AppButton
          v-for="action in actions"
          :id="action.id"
          :key="action.label"
          :variant="action.variant"
          :icon-right="action.icon"
          @click="action.onAction()"
        >
          {{ action.label }}
        </AppButton>
        User menu (coming soon)
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
