import { openDB } from 'idb';
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client';

export async function createIndexedDBPersister(): Promise<Persister> {
  const db = await openDB('react-query', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('queries')) {
        db.createObjectStore('queries');
      }
    },
  });

  return {
    persistClient: async (client: PersistedClient) => {
      await db.put('queries', client, 'client-cache');
    },
    restoreClient: async () => {
      const client = await db.get('queries', 'client-cache');
      return client ?? null;
    },
    removeClient: async () => {
      await db.delete('queries', 'client-cache');
    },
  };
}
