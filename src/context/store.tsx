import { DBInfo } from '@/types/types';
import { create } from 'zustand';

interface dbInfoStoreType {
  dbInfo: DBInfo | undefined
  setDbInfo: (info: DBInfo) => void
}

const dbInfoStore = create<dbInfoStoreType>((set) => ({
  dbInfo: undefined,
  setDbInfo: (newInfo:DBInfo) => set(({ dbInfo: newInfo }))
}));


interface dbFileStoreType {
  dbFile: object | string, //FormData,
  setDbFile: (newFile: object | string) => void
}

const dbFileStore = create<dbFileStoreType>((set) => ({
  dbFile: {},
  setDbFile: (newFile:object | string) => set(({ dbFile: newFile }))
}));


export { dbInfoStore, dbFileStore }
