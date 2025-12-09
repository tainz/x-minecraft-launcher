export type Page = 'Play' | 'Installations' | 'News' | 'Settings';
export type InstallationsTab = 'installations' | 'servers';
export type SettingsSection = 'launcher' | 'defaults' | 'accounts' | 'about';
export type ItemType = 'latest' | 'release' | 'dev' | 'archive' | 'pre';

export interface ManagedItem {
  id: string;
  name: string;
  version: string;
  type: ItemType;
  icon: string;
  path: string;
  lastPlayed: string;
  port?: string;
}

export interface Version {
  id: string;
  name: string;
  type: 'latest' | 'release' | 'dev' | 'archive';
}

export interface NewsItem {
  gid: string;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  imageUrl: string | null;
  contentSnippet: string;
}

export interface Account {
  id: string;
  name: string;
  uuid: string;
}

export interface PageProps {
  initialSection?: SettingsSection;
  initialTab?: InstallationsTab;
}
