<template>
  <button
    @click="onClick"
    :disabled="isUpdating"
    class="group relative font-display text-xl font-bold uppercase tracking-wider text-white h-[60px] w-[260px] transition-all duration-300 ease-in-out transform active:scale-95 disabled:cursor-not-allowed"
  >
    <svg width="0" height="0" class="absolute">
      <defs>
        <clipPath id="scifi-button-clip-path" clipPathUnits="objectBoundingBox">
          <polygon points="0 0, 1 0, 1 1, 0.95 1, 0 1" />
        </clipPath>
      </defs>
    </svg>

    <div
      class="absolute inset-0 bg-slate-900/60 border border-slate-700/80 transition-all duration-300 group-hover:bg-slate-800/80 group-hover:border-slate-600 disabled:group-hover:bg-slate-900/60 disabled:group-hover:border-slate-700/80"
      style="clip-path: url(#scifi-button-clip-path)"
    ></div>

    <div
      class="absolute top-0 left-0 h-full bg-starmade-accent shadow-[0_0_8px_0px_#227b86,0_0_15px_0px_#227b8655]"
      :style="{
        clipPath: 'url(#scifi-button-clip-path)',
        width: `${progress}%`,
        opacity: isUpdating ? 1 : 0,
        transition: progress > 1 ? 'width 0.05s linear' : 'opacity 0.5s ease-out',
      }"
    ></div>

    <div class="relative z-10 flex items-center justify-center h-full w-full">
      <span class="text-2xl">
        {{ isUpdating ? `Updating... ${Math.floor(progress)}%` : 'Launch' }}
      </span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isUpdating: boolean;
  onClick: () => void;
  onUpdateComplete: () => void;
}>();

const progress = ref(0);

watch(() => props.isUpdating, (newVal) => {
  if (newVal) {
    progress.value = 0;
    const interval = setInterval(() => {
      progress.value += 1;
      if (progress.value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          props.onUpdateComplete();
        }, 1000);
      }
    }, 40);
  } else {
    progress.value = 0;
  }
});
</script>
