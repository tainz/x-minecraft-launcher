<template>
  <AppPageContainer>
    <div v-if="view === 'form' && activeItem">
      <InstallationForm
        :item="activeItem"
        :isNew="isNew"
        :itemTypeName="itemTypeName"
        @save="handleSave"
        @cancel="handleCancel"
      />
    </div>
    <div v-else class="h-full flex flex-col">
      <div class="flex justify-between items-center mb-6 flex-shrink-0 pr-4">
        <div class="flex items-center gap-6">
          <button
            @click="setActiveTab('installations')"
            class="font-display text-2xl font-bold uppercase tracking-wider transition-colors duration-200 relative pb-2 px-1"
            :class="activeTab === 'installations' ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
          >
            Installations
            <div v-if="activeTab === 'installations'" class="absolute bottom-0 left-0 w-full h-1 bg-starmade-accent rounded-full shadow-[0_0_8px_0px_#227b86]"></div>
          </button>
          <button
            @click="setActiveTab('servers')"
            class="font-display text-2xl font-bold uppercase tracking-wider transition-colors duration-200 relative pb-2 px-1"
            :class="activeTab === 'servers' ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
          >
            Servers
            <div v-if="activeTab === 'servers'" class="absolute bottom-0 left-0 w-full h-1 bg-starmade-accent rounded-full shadow-[0_0_8px_0px_#227b86]"></div>
          </button>
        </div>
        <button
          @click="handleCreateNew"
          class="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white font-semibold uppercase tracking-wider text-sm hover:bg-white/10 hover:border-white/30 transition-colors"
        >
          <PlusIcon class="w-5 h-5" />
          <span>New {{ itemTypeName }}</span>
        </button>
      </div>
      <div class="flex-grow space-y-4 overflow-y-auto pr-4">
        <div 
          v-for="(item, index) in items" 
          :key="item.id"
          class="flex items-center gap-6 p-4 rounded-lg bg-black/20 border transition-all duration-300"
          :class="index === 0 ? 'border-starmade-accent/80 shadow-[0_0_15px_0px_#227b8644]' : 'border-white/10 hover:border-white/20 hover:bg-black/30'"
        >
          <div class="flex-shrink-0">
            <component :is="getIconComponent(item.icon)" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-bold text-white">{{ item.name }} <span class="text-sm font-normal text-gray-400">{{ item.version }}</span></h3>
            <p class="text-xs text-gray-500 font-mono truncate">{{ item.path }}</p>
          </div>
          <div class="flex-1 text-right">
            <p class="text-sm text-gray-400">{{ cardStatusLabel }}: {{ item.lastPlayed }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-starmade-accent/80 text-white font-semibold uppercase tracking-wider text-sm hover:bg-starmade-accent transition-colors">
              <PlayIcon class="w-4 h-4" />
              <span>{{ cardActionButtonText }}</span>
            </button>
            <Tooltip text="Open Directory">
              <button class="p-2 rounded-md hover:bg-white/10 transition-colors">
                <FolderIcon class="w-5 h-5 text-gray-400" />
              </button>
            </Tooltip>
            <Tooltip text="Settings">
              <button @click="handleEdit(item)" class="p-2 rounded-md hover:bg-white/10 transition-colors">
                <CogIcon class="w-5 h-5 text-gray-400" />
              </button>
            </Tooltip>
            <Tooltip text="Delete">
              <button class="p-2 rounded-md hover:bg-starmade-danger/20 transition-colors">
                <TrashIcon class="w-5 h-5 text-gray-400 hover:text-starmade-danger-light" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  </AppPageContainer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useData } from '@/composables/data';
import { useApp } from '@/composables/app';
import AppPageContainer from './AppPageContainer.vue';
import InstallationForm from './InstallationForm.vue';
import Tooltip from '@/components/Tooltip.vue';
import { getIconComponent } from '@/util/iconMapper';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import PlayIcon from '@/components/icons/PlayIcon.vue';
import FolderIcon from '@/components/icons/FolderIcon.vue';
import CogIcon from '@/components/icons/CogIcon.vue';
import TrashIcon from '@/components/icons/TrashIcon.vue';
import type { ManagedItem, InstallationsTab } from '@/types';

const { pageProps } = useApp();
const { installations, servers, addInstallation, updateInstallation, addServer, updateServer, getInstallationDefaults, getServerDefaults } = useData();

const activeTab = ref<InstallationsTab>('installations');
const view = ref<'list' | 'form'>('list');
const activeItem = ref<ManagedItem | null>(null);
const isNew = ref(false);

watch(() => pageProps.value.initialTab, (newTab) => {
  if (newTab) {
    activeTab.value = newTab;
    view.value = 'list';
  }
}, { immediate: true });

const items = computed(() => activeTab.value === 'installations' ? installations.value : servers.value);
const itemTypeName = computed(() => activeTab.value === 'installations' ? 'Installation' : 'Server');
const cardActionButtonText = computed(() => activeTab.value === 'installations' ? 'Play' : 'Start');
const cardStatusLabel = computed(() => activeTab.value === 'installations' ? 'Last played' : 'Status');

const setActiveTab = (tab: InstallationsTab) => {
  activeTab.value = tab;
  view.value = 'list';
};

const handleCreateNew = () => {
  activeItem.value = activeTab.value === 'installations' ? getInstallationDefaults() : getServerDefaults();
  isNew.value = true;
  view.value = 'form';
};

const handleEdit = (item: ManagedItem) => {
  activeItem.value = item;
  isNew.value = false;
  view.value = 'form';
};

const handleSave = (item: ManagedItem) => {
  if (activeTab.value === 'installations') {
    isNew.value ? addInstallation(item) : updateInstallation(item);
  } else {
    isNew.value ? addServer(item) : updateServer(item);
  }
  view.value = 'list';
};

const handleCancel = () => {
  view.value = 'list';
  activeItem.value = null;
};
</script>
