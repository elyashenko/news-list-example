import type { IStorage } from '../types/storage';
import { log } from '../utils/logger';

export class LocalStorageAdapter implements IStorage {
  get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      log.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      log.error(`Error setting localStorage key "${key}":`, error);
    }
  }

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      log.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      log.error('Error clearing localStorage:', error);
    }
  }

  has(key: string): boolean {
    try {
      return window.localStorage.getItem(key) !== null;
    } catch (error) {
      log.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  }
}
