<template>
  <div class="flex items-center gap-4 w-full">
    <div class="flex-1 px-3">
      <div class="relative">
        <div class="h-2 bg-slate-800/80 rounded-full border border-slate-700 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-starmade-accent/60 to-starmade-accent transition-all duration-150"
            :style="{ width: `${memoryPercentage}%` }"
          />
        </div>
        <input
          type="range"
          :min="MIN_MEMORY"
          :max="MAX_MEMORY"
          :step="STEP"
          :value="value"
          @input="handleSliderChange"
          class="absolute top-0 w-full h-2 opacity-0 cursor-pointer m-0"
        />
        <div 
          class="absolute top-1/2 w-5 h-5 bg-starmade-accent rounded-full border-2 border-white shadow-lg transform -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150"
          :style="{ left: `${memoryPercentage}%` }"
        >
          <div class="absolute inset-0 rounded-full bg-white/20" />
        </div>
      </div>
      <div class="relative mt-2 h-4">
        <div
          v-for="marker in markers"
          :key="marker"
          class="absolute flex flex-col items-center transform -translate-x-1/2"
          :style="{ left: `${((marker - MIN_MEMORY) / (MAX_MEMORY - MIN_MEMORY)) * 100}%` }"
        >
          <div class="w-px h-2 bg-slate-600 mb-1" />
          <span class="text-xs text-gray-500">{{ marker / 1024 }}GB</span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <input
        type="number"
        :value="value"
        @input="handleInputChange"
        :min="MIN_MEMORY"
        :max="MAX_MEMORY"
        :step="STEP"
        class="w-24 bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-starmade-accent"
      />
      <span class="text-sm text-gray-400">MB</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value: number }>();
const emit = defineEmits<{ (e: 'update:value', val: number): void }>();

const MIN_MEMORY = 2048;
const MAX_MEMORY = 16384;
const STEP = 1024;

const memoryPercentage = computed(() => ((props.value - MIN_MEMORY) / (MAX_MEMORY - MIN_MEMORY)) * 100);

const markers = computed(() => {
  const m = [];
  const interval = MAX_MEMORY <= 16384 ? 2048 : 4096;
  for (let i = MIN_MEMORY; i <= MAX_MEMORY; i += interval) {
    m.push(i);
  }
  return m;
});

const handleValueChange = (newValue: number) => {
  const clampedValue = Math.max(MIN_MEMORY, Math.min(MAX_MEMORY, newValue));
  const snappedValue = Math.round(clampedValue / STEP) * STEP;
  emit('update:value', snappedValue);
};

const handleSliderChange = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  handleValueChange(val);
};

const handleInputChange = (e: Event) => {
  const val = parseInt((e.target as HTMLInputElement).value, 10);
  if (!isNaN(val)) {
    handleValueChange(val);
  }
};
</script>
