<script setup lang="ts">
const styleBack = computed<Record<string, string>>(() => ({
  transform: `rotateY(180deg)`,
}))
</script>

<template>
  <div
    style="perspective: 1000px"
    class="min-h-40 min-w-96 rounded border border-primary/40 bg-black p-4"
  >
    <div
      class="relative size-full text-center duration-500"
      style="transform-style: preserve-3d"
    >
      <div
        class="absolute size-full"
        style="
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        "
      >
        <slot name="front" />
      </div>
      <div
        :style="styleBack"
        class="absolute size-full"
        style="
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        "
      >
        <slot name="back" />
      </div>
    </div>
  </div>
</template>
