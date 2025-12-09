<template>
  <div class="relative w-full max-w-6xl mx-auto h-full flex flex-col bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden animate-fade-in-scale">
    <button
      @click="navigate('Play')"
      class="absolute top-1 right-1 p-1.5 rounded-md hover:bg-starmade-danger/20 transition-colors z-10"
      aria-label="Close"
    >
      <CloseIcon class="w-5 h-5 text-gray-400 hover:text-starmade-danger-light" />
    </button>
    <div class="flex-grow p-6 flex flex-col min-h-0">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useApp } from '@/composables/app';
const { navigate } = useApp();
</script>
