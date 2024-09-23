import { DBInfo } from '@/types/types';
import { create } from 'zustand';

interface dbInfoStoreType {
  dbInfo: DBInfo | undefined
  setDbInfo: (info: DBInfo | undefined) => void
}

const dbInfoStore = create<dbInfoStoreType>((set) => ({
  dbInfo: undefined,
  setDbInfo: (newInfo:DBInfo | undefined) => set(({ dbInfo: newInfo }))
}));


interface dbFileStoreType {
  dbFile: object | string,
  setDbFile: (newFile: object | string) => void
}

const dbFileStore = create<dbFileStoreType>((set) => ({
  dbFile: {},
  setDbFile: (newFile:object | string) => set(({ dbFile: newFile }))
}));

interface activeTabType {
  activeTab: string,
  setActiveTab: (newTab:string) => void
}
const tabStore = create<activeTabType>((set) => ({
  activeTab: 'overview',
  setActiveTab: (newTab:string) => set(({ activeTab: newTab }))
}));

export { dbInfoStore, dbFileStore, tabStore }
