<template>
  <div class="relative" :class="className" v-click-outside="close">
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
        <component :is="icon" className="w-5 h-5 text-gray-400" />
      </div>
      <button
        type="button"
        @click="toggle"
        class="w-full bg-slate-900/80 border border-slate-700 rounded-md py-2 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-starmade-accent"
        :class="icon ? 'pl-10' : 'pl-3'"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
      >
        {{ selectedLabel }}
      </button>
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDownIcon class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': isOpen }" />
      </div>
    </div>
    <div v-if="isOpen" class="absolute top-full mt-1 w-full bg-slate-900 border border-slate-700 rounded-md z-20 max-h-60 overflow-y-auto" role="listbox">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        @click="select(option.value)"
        class="w-full text-left px-4 py-2 hover:bg-slate-800"
        role="option"
        :aria-selected="value === option.value"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
import { vClickOutside } from '@/directives/clickOutside';

const props = defineProps<{
  options: { value: string; label: string }[];
  value: string;
  icon?: any;
  className?: string;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const isOpen = ref(false);

const selectedLabel = computed(() => {
  return props.options.find(opt => opt.value === props.value)?.label || 'Select...';
});

const toggle = () => isOpen.value = !isOpen.value;
const close = () => isOpen.value = false;
const select = (val: string) => {
  emit('update:value', val);
  close();
};
</script>
