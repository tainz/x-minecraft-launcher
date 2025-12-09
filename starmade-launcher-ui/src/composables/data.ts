import { ref, InjectionKey, inject } from 'vue';
import type { ManagedItem, Account, Version } from '@/types';

export const kData = Symbol('Data') as InjectionKey<ReturnType<typeof createDataState>>;

// Mock Data
const accountsData: Account[] = [
  { id: '1', name: 'DukeofRealms', uuid: '8d3b4e2a-1b9c-4f7d-8a6e-3c5d7f9a1b2c' },
  { id: '2', name: 'GuestUser123', uuid: 'f4a7b8e1-5c6d-4e8f-9a1b-2c3d4e5f6a7b' },
];

const versionsData: Version[] = [
  { id: '0.203.175', name: 'Latest Release 0.203.175', type: 'latest' },
  { id: '1.19.4', name: 'Release 1.19.4', type: 'release' },
  { id: '24w14a', name: 'Snapshot 24w14a', type: 'dev' },
  { id: '1.0', name: 'Archive 1.0', type: 'archive' },
];

const initialInstallationsData: ManagedItem[] = [
  {
    id: '1',
    name: 'Latest Release',
    version: '0.203.175',
    type: 'latest',
    icon: 'latest',
    path: 'C:\\Games\\StarMade\\Instances\\latest-release',
    lastPlayed: '2 hours ago',
  },
  {
    id: '2',
    name: 'Dev Build',
    version: '24w14a',
    type: 'dev',
    icon: 'dev',
    path: 'C:\\Games\\StarMade\\Instances\\dev-build',
    lastPlayed: '3 days ago',
  },
  {
    id: '3',
    name: 'Legacy Version',
    version: '1.0',
    type: 'archive',
    icon: 'archive',
    path: 'C:\\Games\\StarMade\\Instances\\archive-1.0',
    lastPlayed: 'Over a year ago',
  },
];

const initialServersData: ManagedItem[] = [
  {
    id: 's1',
    name: 'Official EU Server',
    version: '0.203.175',
    type: 'latest',
    icon: 'server',
    path: 'C:\\Games\\StarMade\\Servers\\official-eu',
    lastPlayed: 'Online',
    port: '4242',
  },
  {
    id: 's2',
    name: 'Creative Build World',
    version: '24w14a',
    type: 'dev',
    icon: 'cube',
    path: 'C:\\Games\\StarMade\\Servers\\creative-build',
    lastPlayed: '5 minutes ago',
    port: '27015',
  },
];

const defaultInstallationData: ManagedItem = {
  id: '',
  name: 'New Installation',
  version: '0.203.175',
  type: 'release',
  icon: 'release',
  path: 'C:\\Games\\StarMade\\Instances\\new-installation',
  lastPlayed: 'Never',
};

const defaultServerData: ManagedItem = {
  id: '',
  name: 'New Server',
  version: '0.203.175',
  type: 'release',
  icon: 'server',
  path: 'C:\\Games\\StarMade\\Servers\\new-server',
  lastPlayed: 'Never',
  port: '4242',
};

export function createDataState() {
  const accounts = ref<Account[]>(accountsData);
  const activeAccount = ref<Account | null>(accountsData[0] || null);
  
  const installations = ref<ManagedItem[]>(initialInstallationsData);
  const servers = ref<ManagedItem[]>(initialServersData);
  
  const versions = ref<Version[]>(versionsData);
  const selectedVersion = ref<Version | null>(versionsData[0] || null);

  const addInstallation = (item: ManagedItem) => installations.value.unshift(item);
  const updateInstallation = (item: ManagedItem) => {
    const idx = installations.value.findIndex(i => i.id === item.id);
    if (idx !== -1) installations.value[idx] = item;
  };
  const deleteInstallation = (id: string) => {
    installations.value = installations.value.filter(i => i.id !== id);
  };
  
  const addServer = (item: ManagedItem) => servers.value.unshift(item);
  const updateServer = (item: ManagedItem) => {
    const idx = servers.value.findIndex(s => s.id === item.id);
    if (idx !== -1) servers.value[idx] = item;
  };
  const deleteServer = (id: string) => {
    servers.value = servers.value.filter(s => s.id !== id);
  };

  const getInstallationDefaults = () => ({ ...defaultInstallationData, id: Date.now().toString() });
  const getServerDefaults = () => ({ ...defaultServerData, id: Date.now().toString() });

  return {
    accounts,
    activeAccount,
    installations,
    servers,
    versions,
    selectedVersion,
    addInstallation,
    updateInstallation,
    deleteInstallation,
    addServer,
    updateServer,
    deleteServer,
    getInstallationDefaults,
    getServerDefaults,
  };
}

export function useData() {
  const context = inject(kData);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
