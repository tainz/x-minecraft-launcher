import { ref } from 'vue';
import type { NewsItem } from '@/types';

export function useNews() {
  const news = ref<NewsItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchNews = async () => {
    loading.value = true;
    error.value = null;
    try {
      const feedUrl = 'https://store.steampowered.com/feeds/news/app/244770/';
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');

      const parseError = xml.querySelector('parsererror');
      if (parseError) throw new Error('Failed to parse the news feed.');
      
      const items = xml.querySelectorAll('item');
      
      news.value = Array.from(items).map(item => {
        const title = item.querySelector('title')?.textContent || 'No title';
        const link = item.querySelector('link')?.textContent || '#';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const author = item.querySelector('author')?.textContent || 'Unknown author';
        const gid = item.querySelector('guid')?.textContent || '';
        const descriptionHTML = item.querySelector('description')?.textContent || '';

        const descContainer = document.createElement('div');
        descContainer.innerHTML = descriptionHTML;
        
        const img = descContainer.querySelector('img');
        const imageUrl = img ? img.src : null;
        if (img) img.remove();
        
        const contentSnippet = descContainer.textContent?.trim().substring(0, 200) + '...' || 'No content';

        return {
          gid,
          title,
          link,
          pubDate: new Date(pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author,
          imageUrl,
          contentSnippet,
        };
      });
    } catch (e: any) {
      error.value = `Failed to fetch news feed. Please try again later.`;
      console.error("News fetch error:", e);
    } finally {
      loading.value = false;
    }
  };

  return { news, loading, error, fetchNews };
}
