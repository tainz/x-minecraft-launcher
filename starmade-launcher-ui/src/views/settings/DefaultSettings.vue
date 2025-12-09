<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between items-center mb-6 pb-2 border-b-2 border-white/10 flex-shrink-0">
      <h2 class="font-display text-xl font-bold uppercase tracking-wider text-white">
        Default Settings
      </h2>
      <p class="text-sm text-gray-400">Configure default values for new installations and servers.</p>
    </div>
    
    <div class="flex items-center gap-6 mb-6 flex-shrink-0">
      <button 
        @click="activeTab = 'installations'"
        class="font-display text-lg font-bold uppercase tracking-wider transition-colors duration-200 relative pb-2 px-1"
        :class="activeTab === 'installations' ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
      >
        Installations
        <div v-if="activeTab === 'installations'" class="absolute bottom-0 left-0 w-full h-1 bg-starmade-accent rounded-full shadow-[0_0_8px_0px_#227b86]"></div>
      </button>
      <button 
        @click="activeTab = 'servers'"
        class="font-display text-lg font-bold uppercase tracking-wider transition-colors duration-200 relative pb-2 px-1"
        :class="activeTab === 'servers' ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
      >
        Servers
        <div v-if="activeTab === 'servers'" class="absolute bottom-0 left-0 w-full h-1 bg-starmade-accent rounded-full shadow-[0_0_8px_0px_#227b86]"></div>
      </button>
    </div>

    <div class="flex-grow overflow-y-auto pr-4 -mr-4">
      <div class="space-y-4">
        <SettingRow title="Game Directory" description="The default folder where new installations will be created.">
          <div class="flex w-full">
            <input type="text" v-model="form.gameDir" class="flex-1 bg-slate-900/80 border border-slate-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
            <button class="bg-slate-800/80 border-t border-b border-r border-slate-700 px-4 rounded-r-md hover:bg-slate-700/80">
              <FolderIcon class="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </SettingRow>

        <SettingRow v-if="!isServer" title="Resolution" description="The default screen resolution for new installations.">
          <CustomDropdown
            class="w-full"
            :options="resolutionOptions"
            :value="form.resolution"
            @update:value="v => form.resolution = v"
            :icon="MonitorIcon"
          />
        </SettingRow>

        <SettingRow v-if="isServer" title="Port" description="The default network port for new servers.">
          <input type="text" v-model="form.port" class="w-full bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
        </SettingRow>

        <SettingRow title="Java Memory Allocation" description="Set the default RAM allocated to new instances.">
          <MemorySlider :value="form.javaMemory" @update:value="v => form.javaMemory = v" />
        </SettingRow>

        <SettingRow title="JVM Arguments" description="Java arguments for advanced users. Memory is managed above.">
          <textarea v-model="form.jvmArgs" rows="2" class="w-full bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent font-mono text-sm"></textarea>
        </SettingRow>

        <SettingRow title="Java Executable Path" description="The default Java executable used for new instances.">
          <div class="flex w-full">
            <input type="text" v-model="form.javaPath" class="flex-1 bg-slate-900/80 border border-slate-700 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-starmade-accent" />
            <button class="bg-slate-800/80 border-t border-b border-r border-slate-700 px-4 rounded-r-md hover:bg-slate-700/80">
              <FolderIcon class="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </SettingRow>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import SettingRow from '@/components/SettingRow.vue';
import CustomDropdown from '@/components/CustomDropdown.vue';
import MemorySlider from '@/components/MemorySlider.vue';
import FolderIcon from '@/components/icons/FolderIcon.vue';
import MonitorIcon from '@/components/icons/MonitorIcon.vue';

const activeTab = ref<'installations' | 'servers'>('installations');
const isServer = computed(() => activeTab.value === 'servers');

// State for form
const form = reactive({
  gameDir: 'C:\\Games\\StarMade\\Instances\\default',
  resolution: '1920x1080',
  port: '4242',
  javaMemory: 4096,
  javaPath: 'C:\\Program Files\\Java\\jdk-17\\bin\\javaw.exe',
  jvmArgs: '-Xms4G -Xmx4G'
});

const resolutionOptions = ["1280x720", "1920x1080", "2560x1440", "3840x2160"].map(r => ({ value: r, label: r }));

// Watchers for Memory <-> JVM Args Sync
watch(() => form.javaMemory, (newVal) => {
  const gb = newVal / 1024;
  const otherArgs = form.jvmArgs.split(' ').filter(arg => !arg.startsWith('-Xm')).join(' ');
  form.jvmArgs = `-Xms${gb}G -Xmx${gb}G ${otherArgs}`.trim();
});

watch(() => form.jvmArgs, (newVal) => {
  const match = newVal.match(/-Xmx(\d+)G/i);
  if (match && match[1]) {
    const mb = parseInt(match[1]) * 1024;
    if (form.javaMemory !== mb) form.javaMemory = mb;
  }
});

// Update default path when tab changes
watch(activeTab, (newTab) => {
  if (newTab === 'servers') {
    form.gameDir = 'C:\\Games\\StarMade\\Servers\\default';
  } else {
    form.gameDir = 'C:\\Games\\StarMade\\Instances\\default';
  }
});
</script>
