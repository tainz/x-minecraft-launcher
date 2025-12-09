<template>
  <div class="bg-starmade-bg text-gray-200 font-sans h-screen w-screen flex flex-col antialiased">
    <AppLaunchModal
      :isOpen="isLaunchModalOpen"
      @confirm="startLaunching"
      @launchAnyway="startLaunching"
      @cancel="closeLaunchModal"
    />
    
    <div 
      class="absolute inset-0 bg-cover bg-center z-0" 
      style="background-image: url('https://www.star-made.org/images/bg1.jpg')"
    >
      <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, transparent 30%, black 100%)"></div>
    </div>
    
    <div class="relative z-10 flex flex-col flex-grow h-full">
      <AppHeader />
      <main class="flex-grow flex items-center justify-center p-8 overflow-y-auto">
        <component :is="currentPageComponent" />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { createAppState, kApp } from '@/composables/app';
import { createDataState, kData } from '@/composables/data';
import AppHeader from '@/views/AppHeader.vue';
import AppFooter from '@/views/AppFooter.vue';
import AppLaunchModal from '@/views/AppLaunchModal.vue';
import Play from '@/views/Play.vue';
import Installations from '@/views/Installations.vue';
import News from '@/views/News.vue';
import Settings from '@/views/Settings.vue';

// Provide Global State
const appState = createAppState();
const dataState = createDataState();
provide(kApp, appState);
provide(kData, dataState);

const { activePage, isLaunchModalOpen, startLaunching, closeLaunchModal } = appState;

const currentPageComponent = computed(() => {
  switch (activePage.value) {
    case 'Installations': return Installations;
    case 'News': return News;
    case 'Settings': return Settings;
    case 'Play':
    default: return Play;
  }
});
</script>
