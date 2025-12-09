<template>
  <footer class="relative z-20 px-6 py-4 bg-black/20 backdrop-blur-sm border-t border-white/5">
    <div class="flex items-center justify-between">
      <div class="flex-1 flex justify-start">
        <a 
          :href="inviteUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 px-4 py-2 bg-black/20 rounded-md hover:bg-black/40 transition-colors border border-white/10 group"
        >
          <DiscordIcon class="w-6 text-gray-400 group-hover:text-white transition-colors" />
          <div class="text-left">
            <p class="text-sm font-medium text-white">Join Discord</p>
            <p v-if="onlineCount !== null" class="text-xs text-gray-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {{ onlineCount.toLocaleString() }} Online
            </p>
            <p v-else class="text-xs text-gray-400">Loading members...</p>
          </div>
        </a>
      </div>
      
      <div class="flex items-center justify-center gap-6">
        <!-- Version Selector -->
        <div class="relative" v-click-outside="closeVersion">
          <button 
            @click="toggleVersion"
            class="flex items-center gap-3 pl-4 pr-3 py-2 bg-black/20 rounded-md hover:bg-black/40 transition-colors border border-white/10"
          >
            <div class="flex items-center gap-2" v-if="selectedVersion">
              <component :is="getIconForType(selectedVersion.type)" :className="getIconClass(selectedVersion.type)" />
              <div class="text-left">
                <p class="text-sm font-medium text-white">{{ selectedVersion.name.split(' ').slice(0, 2).join(' ') }}</p>
                <p class="text-xs text-gray-400">{{ selectedVersion.name.split(' ').slice(2).join(' ') }}</p>
              </div>
            </div>
            <ChevronDownIcon class="w-5 h-5 text-gray-400 transition-transform" :class="{ 'rotate-180': isVersionOpen }" />
          </button>

          <div v-if="isVersionOpen" class="absolute bottom-full mb-2 w-full bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-md shadow-lg overflow-hidden z-20">
            <ul>
              <li v-for="version in versions" :key="version.id">
                <button 
                  @click="selectVersion(version)"
                  class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700/50 transition-colors"
                >
                  <component :is="getIconForType(version.type)" :className="getIconClass(version.type)" />
                  <span class="text-sm text-white">{{ version.name }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <SciFiButton 
          :isUpdating="isLaunching"
          :onClick="openLaunchModal"
          :onUpdateComplete="completeLaunching"
        />

        <button 
          @click="navigate('Installations', { initialTab: 'servers' })"
          class="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
          <span>Start Server</span>
          <ChevronRightIcon class="w-4 h-4" />
        </button>
      </div>

      <div class="flex-1 flex justify-end"></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApp } from '@/composables/app';
import { useData } from '@/composables/data';
import { vClickOutside } from '@/directives/clickOutside';
import DiscordIcon from '@/components/icons/DiscordIcon.vue';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';
import BugIcon from '@/components/icons/BugIcon.vue';
import ArchiveIcon from '@/components/icons/ArchiveIcon.vue';
import SciFiButton from '@/components/SciFiButton.vue';
import type { Version } from '@/types';

const { navigate, isLaunching, openLaunchModal, completeLaunching } = useApp();
const { versions, selectedVersion } = useData();

const onlineCount = ref<number | null>(null);
const inviteUrl = ref('https://discord.com/invite/z6SqBZHU');
const isVersionOpen = ref(false);

const toggleVersion = () => isVersionOpen.value = !isVersionOpen.value;
const closeVersion = () => isVersionOpen.value = false;
const selectVersion = (v: Version) => {
  selectedVersion.value = v;
  closeVersion();
};

const getIconForType = (type: Version['type']) => {
  switch(type) {
    case 'latest': return CheckIcon;
    case 'release': return CheckIcon;
    case 'dev': return BugIcon;
    case 'archive': return ArchiveIcon;
    default: return ArchiveIcon;
  }
};

const getIconClass = (type: Version['type']) => {
  switch(type) {
    case 'latest': return "w-5 h-5 text-green-400";
    case 'release': return "w-5 h-5 text-green-400";
    case 'dev': return "w-5 h-5 text-orange-400";
    case 'archive': return "w-5 h-5 text-gray-400";
    default: return "w-5 h-5 text-gray-400";
  }
};

onMounted(() => {
  fetch('https://discordapp.com/api/guilds/100173352475303936/widget.json')
    .then(res => res.json())
    .then(data => {
      if (data?.presence_count) onlineCount.value = data.presence_count;
      if (data?.instant_invite) inviteUrl.value = data.instant_invite;
    })
    .catch(err => console.error('Discord fetch error:', err));
});
</script>
