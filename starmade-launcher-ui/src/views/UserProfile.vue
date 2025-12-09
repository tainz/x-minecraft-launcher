<template>
  <div class="relative" v-click-outside="close">
    <div @click="toggle" class="flex items-center gap-3 cursor-pointer group">
      <div class="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center group-hover:bg-slate-700/70 transition-colors border border-slate-700">
        <UserIcon class="w-6 h-6 text-slate-400" />
      </div>
      <div>
        <h3 class="font-semibold text-white">{{ activeAccount?.name }}</h3>
      </div>
      <ChevronDownIcon class="w-4 h-4 text-gray-400 group-hover:text-white transition-all" :class="{ 'rotate-180': isOpen }" />
    </div>

    <div v-if="isOpen" class="absolute top-full mt-2 w-72 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-md shadow-lg overflow-hidden z-20">
      <div class="p-2">
        <p class="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">ACCOUNTS</p>
        <ul>
          <li v-for="account in accounts" :key="account.id">
            <button
              @click="selectAccount(account)"
              class="w-full flex items-center gap-3 px-2 py-2 text-left rounded-md hover:bg-slate-700/50 transition-colors"
            >
              <div class="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
                <UserIcon class="w-5 h-5 text-slate-400" />
              </div>
              <span class="text-sm text-white flex-1">{{ account.name }}</span>
              <CheckCircleIcon v-if="activeAccount?.id === account.id" class="w-5 h-5 text-starmade-accent" />
            </button>
          </li>
        </ul>
      </div>
      <hr class="border-slate-700/50" />
      <div class="p-2">
        <ul>
          <li>
            <button
              @click="goToSettings"
              class="w-full flex items-center gap-3 px-2 py-2 text-left rounded-md hover:bg-slate-700/50 transition-colors text-sm text-gray-300 hover:text-white"
            >
              <CogIcon class="w-5 h-5" />
              <span>Manage Accounts</span>
            </button>
          </li>
          <li>
            <button class="w-full flex items-center gap-3 px-2 py-2 text-left rounded-md hover:bg-slate-700/50 transition-colors text-sm text-gray-300 hover:text-white">
              <UserPlusIcon class="w-5 h-5" />
              <span>Add Account</span>
            </button>
          </li>
          <li>
            <button class="w-full flex items-center gap-3 px-2 py-2 text-left rounded-md hover:bg-slate-700/50 transition-colors text-sm text-gray-300 hover:text-white">
              <ArrowRightOnRectangleIcon class="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useData } from '@/composables/data';
import { useApp } from '@/composables/app';
import { vClickOutside } from '@/directives/clickOutside';
import UserIcon from '@/components/icons/UserIcon.vue';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue';
import CogIcon from '@/components/icons/CogIcon.vue';
import UserPlusIcon from '@/components/icons/UserPlusIcon.vue';
import ArrowRightOnRectangleIcon from '@/components/icons/ArrowRightOnRectangleIcon.vue';

const { accounts, activeAccount } = useData();
const { navigate } = useApp();
const isOpen = ref(false);

const toggle = () => isOpen.value = !isOpen.value;
const close = () => isOpen.value = false;

const selectAccount = (account: any) => {
  activeAccount.value = account;
  close();
};

const goToSettings = () => {
  navigate('Settings', { initialSection: 'accounts' });
  close();
};
</script>
