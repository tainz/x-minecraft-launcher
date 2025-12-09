<template>
  <button
    @click="$emit('update:checked', !checked)"
    class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
    :class="checked ? 'bg-starmade-accent' : 'bg-slate-600'"
    role="switch"
    :aria-checked="checked"
  >
    <span 
      class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
      :class="checked ? 'translate-x-6' : 'translate-x-1'"
    />
  </button>
</template>
<script setup lang="ts">
defineProps<{ checked: boolean }>();
defineEmits<{ (e: 'update:checked', val: boolean): void }>();
</script>
