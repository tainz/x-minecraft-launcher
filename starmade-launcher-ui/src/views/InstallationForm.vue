<template>
  <div class="h-full flex flex-col text-white">
    <!-- Icon Picker Modal -->
    <div v-if="isIconPickerOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" @click="isIconPickerOpen = false">
      <div class="bg-slate-900/90 border border-slate-700 rounded-lg shadow-xl p-6 w-full max-w-2xl relative animate-fade-in-scale" @click.stop>
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-display text-2xl font-bold uppercase text-white tracking-wider">Choose an Icon</h2>
          <button @click="isIconPickerOpen = false" class="p-1.5 rounded-md hover:bg-starmade-danger/20 transition-colors">
            <CloseIcon class="w-5 h-5 text-gray-400 hover:text-starmade-danger-light" />
          </button>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <button 
            v-for="iconObj in availableIcons" 
            :key="iconObj.icon" 
            @click="selectIcon(iconObj.icon)"
            class="flex flex-col items-center justify-center gap-3 p-4 bg-black/20 rounded-lg border border-white/10 hover:border-starmade-accent hover:bg-starmade-accent/10 transition-all group"
          >
            <div class="w-20 h-20 flex items-center justify-center">
              <component :is="getIconComponent(iconObj.icon, 'large')" />
            </div>
            <span class="text-sm font-semibold text-gray-300 group-hover:text-white">{{ iconObj.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mb-6 flex-shrink-0 pr-4">
      <h1 class="font-display text-3xl font-bold uppercase tracking-wider">{{ title }}</h1>
      <div class="flex items-center gap-4">
        <button @click="$emit('cancel')" class="px-4 py-2 rounded-md hover:bg-white/10 transition-colors text-sm font-semibold uppercase tracking-wider">
          Cancel
        </button>
        <button @click="handleSave" class="px-6 py-2 rounded-md bg-starmade-accent hover:bg-starmade-accent-hover transition-colors text-sm font-bold uppercase tracking-wider">
          {{ saveButtonText }}
        </button>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto pr-4 space-y-8">
      <div class="flex gap-8 items-start">
        <div class="flex flex-col items-center gap-4">
          <button
            @click="isIconPickerOpen = true"
            class="w-32 h-32 bg-black/30 rounded-lg flex items-center justify-center border border-white/10 hover:border-starmade-accent/80 hover:shadow-[0_0_15px_0px_#227b8644] transition-all group cursor-pointer relative"
            aria-label="Change installation icon"
          >
            <component :is="getIconComponent(form.icon, 'large')" />
            <div class="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
              <PencilIcon class="w-8 h-8" />
              <span class="text-xs uppercase font-bold tracking-wider">Change Icon</span>
            </div>
          </button>
          <p class="text-sm text-gray-400">Click to change icon</p>
        </div>

        <div class="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
          <div v-if="itemTypeName === 'Server'" class="contents">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</label>
              <input v-model="form.name" type="text" class="bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Port</label>
              <input v-model="form.port" type="text" class="bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
            </div>
          </div>
          <div v-else class="col-span-2 flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Name</label>
            <input v-model="form.name" type="text" class="bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Branch</label>
            <CustomDropdown :options="branches" :value="form.type" @update:value="v => form.type = v as any" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Version</label>
            <CustomDropdown :options="versions" :value="form.version" @update:value="v => form.version = v" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-x-8 gap-y-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Game Directory</label>
          <div class="flex">
            <input v-model="form.path" type="text" class="flex-1 bg-slate-900/80 border border-slate-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
            <button class="bg-slate-800/80 border-t border-b border-r border-slate-700 px-4 rounded-r-md hover:bg-slate-700/80">
              <FolderIcon class="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Resolution</label>
          <CustomDropdown :options="resolutionOptions" :value="resolution" @update:value="v => resolution = v" :icon="MonitorIcon" />
        </div>

        <div class="col-span-2">
          <hr class="border-slate-800 my-2" />
          <button 
            @click="showMoreOptions = !showMoreOptions" 
            class="w-full flex justify-between items-center p-2 rounded-md hover:bg-white/5 transition-colors"
            :aria-expanded="showMoreOptions"
          >
            <span class="text-base font-semibold text-gray-300 uppercase tracking-wider">More Options</span>
            <ChevronDownIcon class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': showMoreOptions }" />
          </button>

          <div v-if="showMoreOptions" class="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 animate-fade-in-scale">
            <div class="col-span-2 flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Java Memory Allocation</label>
              <MemorySlider :value="javaMemory" @update:value="v => javaMemory = v" />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">Java Executable Path</label>
              <div class="flex">
                <input v-model="javaPath" type="text" class="flex-1 bg-slate-900/80 border border-slate-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
                <button class="bg-slate-800/80 border-t border-b border-r border-slate-700 px-4 rounded-r-md hover:bg-slate-700/80">
                  <FolderIcon class="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-gray-300 uppercase tracking-wider">JVM Arguments</label>
              <textarea v-model="jvmArgs" rows="2" class="bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent font-mono text-sm"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import type { ManagedItem } from '@/types';
import { getIconComponent } from '@/util/iconMapper';
import CustomDropdown from '@/components/CustomDropdown.vue';
import MemorySlider from '@/components/MemorySlider.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import PencilIcon from '@/components/icons/PencilIcon.vue';
import FolderIcon from '@/components/icons/FolderIcon.vue';
import MonitorIcon from '@/components/icons/MonitorIcon.vue';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';

const props = defineProps<{
  item: ManagedItem;
  isNew: boolean;
  itemTypeName: string;
}>();

const emit = defineEmits<{
  (e: 'save', item: ManagedItem): void;
  (e: 'cancel'): void;
}>();

const form = reactive({ ...props.item });
const resolution = ref('1920x1080');
const javaMemory = ref(4096);
const javaPath = ref('C:\\Program Files\\Java\\jdk-17\\bin\\javaw.exe');
const jvmArgs = ref('-Xms4G -Xmx4G');
const showMoreOptions = ref(false);
const isIconPickerOpen = ref(false);

const title = computed(() => props.isNew ? `New ${props.itemTypeName}` : `Edit ${props.itemTypeName}`);
const saveButtonText = computed(() => props.isNew ? 'Create' : 'Save');

const branches = [
  { value: 'release', label: 'Release' },
  { value: 'dev', label: 'Dev' },
  { value: 'pre', label: 'Pre-Release' },
  { value: 'archive', label: 'Archive' },
];

const versions = [
  { value: '0.203.175', label: '0.203.175' },
  { value: '24w14a', label: '24w14a' },
  { value: '1.0', label: '1.0' },
];

const resolutionOptions = ["1280x720", "1920x1080", "2560x1440", "3840x2160"].map(r => ({ value: r, label: r }));

const availableIcons = [
  { icon: 'release', name: 'Release' }, { icon: 'dev', name: 'Dev Build' },
  { icon: 'pre', name: 'Pre-release' }, { icon: 'archive', name: 'Archive' },
  { icon: 'rocket', name: 'Rocket' }, { icon: 'planet', name: 'Planet' },
  { icon: 'star', name: 'Star' }, { icon: 'server', name: 'Server' },
  { icon: 'code', name: 'Code' }, { icon: 'bolt', name: 'Bolt' },
  { icon: 'beaker', name: 'Beaker' }, { icon: 'cube', name: 'Cube' },
];

// Sync Memory Slider -> JVM Args
watch(javaMemory, (newVal) => {
  const gb = newVal / 1024;
  const otherArgs = jvmArgs.value.split(' ').filter(arg => !arg.startsWith('-Xm')).join(' ');
  jvmArgs.value = `-Xms${gb}G -Xmx${gb}G ${otherArgs}`.trim();
});

// Sync JVM Args -> Memory Slider
watch(jvmArgs, (newVal) => {
  const match = newVal.match(/-Xmx(\d+)G/i);
  if (match && match[1]) {
    const mb = parseInt(match[1]) * 1024;
    if (javaMemory.value !== mb) javaMemory.value = mb;
  }
});

const selectIcon = (icon: string) => {
  form.icon = icon;
  isIconPickerOpen.value = false;
};

const handleSave = () => {
  emit('save', { ...form });
};
</script>
