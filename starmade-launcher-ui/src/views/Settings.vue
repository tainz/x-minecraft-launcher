<template>
  <AppPageContainer>
    <div class="flex flex-grow min-h-0 -m-6">
      <aside class="w-64 bg-black/20 border-r border-white/10 p-4 flex-shrink-0">
        <h1 class="font-display text-2xl font-bold uppercase text-white mb-8 tracking-wider px-2 pt-2">
          Settings
        </h1>
        <nav class="flex flex-col gap-2">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeSection = item.id"
            class="flex items-center gap-4 px-3 py-2.5 rounded-md text-left transition-colors text-base font-semibold"
            :class="activeSection === item.id 
              ? 'bg-starmade-accent/20 text-white border-l-4 border-starmade-accent' 
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            "
          >
            <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
            <span>{{ item.label }}</span>
          </button>
        </nav>
      </aside>

      <main class="flex-1 p-8 overflow-y-auto">
        <component :is="activeComponent" />
      </main>
    </div>
  </AppPageContainer>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue';
import { useApp } from '@/composables/app';
import AppPageContainer from './AppPageContainer.vue';
import LauncherSettings from './settings/LauncherSettings.vue';
import DefaultSettings from './settings/DefaultSettings.vue';
import AccountSettings from './settings/AccountSettings.vue';
import AboutSection from './settings/AboutSection.vue';

import CogIcon from '@/components/icons/CogIcon.vue';
import ArchiveIcon from '@/components/icons/ArchiveIcon.vue';
import UserIcon from '@/components/icons/UserIcon.vue';
import InformationCircleIcon from '@/components/icons/InformationCircleIcon.vue';
import type { SettingsSection } from '@/types';

const { pageProps } = useApp();
const activeSection = ref<SettingsSection>('launcher');

watch(() => pageProps.value.initialSection, (newSec) => {
  if (newSec) activeSection.value = newSec;
}, { immediate: true });

const menuItems: { id: SettingsSection; label: string; icon: Component }[] = [
  { id: 'launcher', label: 'Launcher Settings', icon: CogIcon },
  { id: 'defaults', label: 'Default Settings', icon: ArchiveIcon },
  { id: 'accounts', label: 'Accounts', icon: UserIcon },
  { id: 'about', label: 'About', icon: InformationCircleIcon },
];

const activeComponent = computed(() => {
  switch (activeSection.value) {
    case 'launcher': return LauncherSettings;
    case 'defaults': return DefaultSettings;
    case 'accounts': return AccountSettings;
    case 'about': return AboutSection;
    default: return LauncherSettings;
  }
});
</script>