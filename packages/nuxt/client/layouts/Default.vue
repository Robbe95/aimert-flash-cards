<template>
  <div class="w-full bg-background">
    <div class="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main class="container mx-auto flex w-full flex-1 flex-col px-4 py-12 text-foreground">
        <slot />
      </main>
    </div>
  </div>
</template>
