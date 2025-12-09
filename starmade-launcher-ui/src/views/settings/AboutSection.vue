<template>
  <div>
    <div class="text-center mb-8">
      <h1 class="font-display text-4xl font-bold text-white">StarMade Launcher</h1>
      <p class="text-lg text-gray-400 mt-1">Version 1.0.0</p>
    </div>
    
    <div class="bg-black/20 p-6 rounded-lg border border-white/10 max-w-lg mx-auto">
      <h2 class="font-display text-xl font-bold uppercase tracking-wider text-white mb-4">
        Credits & Information
      </h2>
      <p class="text-gray-300 mb-6">
        The official launcher for StarMade, designed to provide a modern and feature-rich experience.
        All game assets and the StarMade name are property of Schine GmbH.
      </p>

      <h3 class="font-semibold text-white mb-3">Useful Links</h3>
      <div class="space-y-2">
        <a 
          v-for="link in links" 
          :key="link.name" 
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex justify-between items-center p-3 rounded-md bg-slate-800/60 hover:bg-slate-700/80 transition-colors group"
        >
          <span class="font-semibold">{{ link.name }}</span>
          <ChevronRightIcon class="w-5 h-5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>

    <div class="text-center mt-8 text-sm text-gray-500">
      <p>Created by DukeofRealms</p>
      <p>Happy building, citizens!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';

const links = [
  { name: "Official Website", url: "https://www.star-made.org/" },
  { name: "Community Discord", url: "https://discord.gg/starmade" },
  { name: "Report an Issue", url: "https://github.com/dukedot" },
  { name: "Third-Party Licenses", url: "#" },
];
</script>
