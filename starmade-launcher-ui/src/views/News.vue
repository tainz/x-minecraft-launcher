<template>
  <AppPageContainer>
    <div class="h-full flex flex-col">
      <h1 class="font-display text-3xl font-bold uppercase text-white mb-6 tracking-wider flex-shrink-0">
        Steam News Feed
      </h1>
      
      <div v-if="loading" class="flex flex-col items-center justify-center gap-4 h-full">
        <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-xl font-display text-white tracking-wider">Loading News...</p>
      </div>

      <div v-else-if="error" class="flex justify-center items-center h-full text-center">
        <p class="text-xl font-display text-red-400">{{ error }}</p>
      </div>

      <div v-else class="flex-grow overflow-y-auto pr-4 space-y-6">
        <a 
          v-for="item in news" 
          :key="item.gid" 
          :href="item.link" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="block bg-black/20 p-4 rounded-lg group hover:bg-black/40 border border-transparent hover:border-white/10 transition-all"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="w-full md:w-56 h-auto md:h-32 object-cover rounded-md flex-shrink-0" />
            <div class="flex-1">
              <p class="text-sm text-gray-400 mb-1">{{ item.pubDate }} by {{ item.author }}</p>
              <h2 class="font-display text-xl font-bold text-white group-hover:text-starmade-text-accent transition-colors mb-2">{{ item.title }}</h2>
              <p class="text-gray-300 text-sm leading-relaxed">
                <span v-for="(part, i) in splitContent(item.contentSnippet)" :key="i">
                  <code v-if="part.isCode" class="bg-slate-800 text-starmade-text-accent font-mono py-0.5 px-1.5 rounded-sm text-xs">{{ part.text }}</code>
                  <span v-else>{{ part.text }}</span>
                </span>
              </p>
              <div class="mt-3 flex items-center text-starmade-text-accent font-semibold text-sm">
                <span>Read More</span>
                <ChevronRightIcon class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </AppPageContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AppPageContainer from './AppPageContainer.vue';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue';
import { useNews } from '@/composables/news';

const { news, loading, error, fetchNews } = useNews();

onMounted(() => {
  if (news.value.length === 0) fetchNews();
});

const splitContent = (text: string) => {
  const parts = text.split(/(\[c\].*?\[\/c\])/g);
  return parts.map(part => {
    if (part.startsWith('[c]') && part.endsWith('[/c]')) {
      return { isCode: true, text: part.substring(3, part.length - 4) };
    }
    return { isCode: false, text: part };
  });
};
</script>
