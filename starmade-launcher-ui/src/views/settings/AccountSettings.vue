<template>
  <div>
    <div class="flex justify-between items-center mb-6 pb-2 border-b-2 border-white/10">
      <h2 class="font-display text-xl font-bold uppercase tracking-wider text-white">
        Accounts
      </h2>
      <div class="flex items-center gap-2">
        <button class="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-semibold uppercase tracking-wider">
          Log Out
        </button>
        <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-starmade-accent hover:bg-starmade-accent-hover transition-colors text-sm font-bold uppercase tracking-wider">
          <PlusIcon class="w-5 h-5" />
          Add Account
        </button>
      </div>
    </div>
    
    <div class="space-y-3">
      <div v-for="account in accounts" :key="account.id">
        <div v-if="account.id === activeAccount?.id" class="flex items-center gap-4 p-4 rounded-lg bg-starmade-accent/20 border border-starmade-accent/80">
          <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
            <UserIcon class="w-8 h-8 text-slate-300" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white">{{ account.name }}</h3>
            <p class="text-sm text-gray-400">UUID: {{ account.uuid }}</p>
          </div>
          <div>
            <span class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-green-500/30 text-green-300">
              Active
            </span>
          </div>
        </div>

        <button 
          v-else 
          @click="activeAccount = account"
          class="w-full flex items-center gap-4 p-4 rounded-lg bg-black/20 border border-white/10 text-left transition-colors hover:bg-white/5 hover:border-white/20"
        >
          <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <UserIcon class="w-8 h-8 text-slate-400" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-300">{{ account.name }}</h3>
            <p class="text-sm text-gray-500">UUID: {{ account.uuid }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from '@/composables/data';
import UserIcon from '@/components/icons/UserIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

const { accounts, activeAccount } = useData();
</script>
