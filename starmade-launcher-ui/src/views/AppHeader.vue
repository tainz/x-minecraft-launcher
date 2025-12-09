<template>
  <header class="relative z-30 flex justify-between items-center px-6 py-3 bg-black/20 backdrop-blur-sm border-b border-white/5" style="-webkit-app-region: drag">
    <div class="flex-1 flex justify-start" style="-webkit-app-region: no-drag">
      <div class="flex items-center gap-3">
        <UserProfile />
        <button 
          @click="navigate('Settings')"
          class="p-2 rounded-full hover:bg-white/10 transition-colors" 
          aria-label="Settings"
        >
          <CogIcon class="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
        </button>
      </div>
    </div>
    <div class="flex-1 flex justify-center" style="-webkit-app-region: no-drag">
      <nav class="flex items-center gap-10">
        <button 
          v-for="item in navItems" 
          :key="item" 
          @click="navigate(item)"
          class="font-display uppercase tracking-widest transition-colors duration-200 relative pb-2"
          :class="activePage === item ? 'text-white' : 'text-gray-500 hover:text-gray-300'"
        >
          {{ item }}
          <div v-if="activePage === item" class="absolute bottom-0 left-0 w-full h-1 bg-starmade-accent rounded-full shadow-[0_0_8px_0px_#227b86]"></div>
        </button>
      </nav>
    </div>
    <div class="flex-1 flex justify-end" style="-webkit-app-region: no-drag">
      <div class="flex items-center gap-2">
        <button class="p-2 rounded-md hover:bg-white/5 transition-colors">
          <MinimizeIcon class="w-5 h-5 text-gray-400" />
        </button>
        <button class="p-2 rounded-md hover:bg-white/5 transition-colors">
          <MaximizeIcon class="w-5 h-5 text-gray-400" />
        </button>
        <button class="p-2 rounded-md hover:bg-starmade-danger/20 transition-colors">
          <CloseIcon class="w-5 h-5 text-gray-400 hover:text-starmade-danger-light" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useApp } from '@/composables/app';
import UserProfile from './UserProfile.vue';
import CogIcon from '@/components/icons/CogIcon.vue';
import MinimizeIcon from '@/components/icons/MinimizeIcon.vue';
import MaximizeIcon from '@/components/icons/MaximizeIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import type { Page } from '@/types';

const { activePage, navigate } = useApp();
const navItems: Page[] = ['Play', 'Installations', 'News'];
</script>
