<template>
  <div class="h-full flex flex-col">
    <h2 class="flex-shrink-0 font-display text-xl font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b-2 border-white/10">
      General
    </h2>

    <div class="flex-grow overflow-y-auto pr-4">
      <div class="space-y-4">
        <SettingRow description-class="" content-class="" title="Language" description="Choose the language for the launcher UI.">
          <CustomDropdown 
            class="w-64"
            :options="languageOptions" 
            :value="language" 
            @update:value="v => language = v" 
          />
        </SettingRow>
        <SettingRow description-class="" content-class="" title="After Launching Game" description="Control what happens to the launcher after the game starts.">
          <CustomDropdown 
            class="w-64"
            :options="closeBehaviorOptions" 
            :value="closeBehavior" 
            @update:value="v => closeBehavior = v" 
          />
        </SettingRow>
      </div>

      <div class="mt-8">
        <h2 class="font-display text-xl font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b-2 border-white/10">
          Updates & Java
        </h2>
        <div class="space-y-4">
          <SettingRow description-class="" content-class="" title="Check for launcher updates" description="Automatically check for updates when the launcher starts.">
            <ToggleSwitch :checked="checkForUpdates" @update:checked="v => checkForUpdates = v" />
          </SettingRow>
          <SettingRow description-class="" content-class="" title="Check for updates now" description="Manually check for a new version of the launcher.">
            <button class="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-semibold uppercase tracking-wider">
              Check Now
            </button>
          </SettingRow>
          <SettingRow description-class="" content-class="" title="Manage Bundled Java Runtimes" description="View and manage the Java runtimes used by the launcher.">
            <button class="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-semibold uppercase tracking-wider">
              Manage Java
            </button>
          </SettingRow>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="font-display text-xl font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b-2 border-white/10">
          Game Log
        </h2>
        <div class="space-y-4">
          <SettingRow description-class="" content-class="" title="Show StarMade Log" description="Shows a window that streams the log after the game has started.">
            <ToggleSwitch :checked="showLog" @update:checked="v => showLog = v" />
          </SettingRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingRow from '@/components/SettingRow.vue';
import CustomDropdown from '@/components/CustomDropdown.vue';
import ToggleSwitch from '@/components/ToggleSwitch.vue';

const language = ref('English (US)');
const closeBehavior = ref('Close launcher');
const checkForUpdates = ref(true);
const showLog = ref(false);

const languageOptions = [
  { value: 'English (US)', label: 'English (US)' },
  { value: 'Deutsch', label: 'Deutsch' },
  { value: 'Français', label: 'Français' },
];

const closeBehaviorOptions = [
  { value: 'Close launcher', label: 'Close launcher' },
  { value: 'Hide launcher', label: 'Hide launcher' },
  { value: 'Keep the launcher open', label: 'Keep the launcher open' },
];
</script>
