import type { IStorage, IStorageFactory } from '../types/storage';
import { LocalStorageAdapter } from './LocalStorageAdapter';

export class StorageFactory implements IStorageFactory {
  createStorage(): IStorage {
    return new LocalStorageAdapter();
  }
}

// Синглтон для доступа к фабрике
export const storageFactory = new StorageFactory();
