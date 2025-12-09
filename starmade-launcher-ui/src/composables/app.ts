import { ref, InjectionKey, inject } from 'vue';
import type { Page, PageProps } from '@/types';

export const kApp = Symbol('App') as InjectionKey<ReturnType<typeof createAppState>>;

export function createAppState() {
  const activePage = ref<Page>('Play');
  const pageProps = ref<PageProps>({});
  const isLaunchModalOpen = ref(false);
  const isLaunching = ref(false);

  const navigate = (page: Page, props: PageProps = {}) => {
    activePage.value = page;
    pageProps.value = props;
  };

  const openLaunchModal = () => {
    if (!isLaunching.value) {
      isLaunchModalOpen.value = true;
    }
  };

  const closeLaunchModal = () => {
    isLaunchModalOpen.value = false;
  };

  const startLaunching = () => {
    console.log("Launch sequence started.");
    isLaunchModalOpen.value = false;
    isLaunching.value = true;
  };

  const completeLaunching = () => {
    console.log("Launch sequence complete.");
    isLaunching.value = false;
  };

  return {
    activePage,
    pageProps,
    isLaunchModalOpen,
    isLaunching,
    navigate,
    openLaunchModal,
    closeLaunchModal,
    startLaunching,
    completeLaunching
  };
}

export function useApp() {
  const context = inject(kApp);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
