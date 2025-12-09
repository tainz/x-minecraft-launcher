<template>
  <div class="flex justify-between items-center bg-black/20 p-4 rounded-lg border border-white/10">
    <div>
      <h3 class="font-semibold text-white">{{ title }}</h3>
      <p class="text-sm text-gray-400" :class="descriptionClass">{{ description }}</p>
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ 
  title: string; 
  description: string;
  descriptionClass?: string;
  contentClass?: string;
}>(), {
  descriptionClass: 'max-w-sm',
  contentClass: 'min-w-[300px] flex justify-end'
});
</script>
