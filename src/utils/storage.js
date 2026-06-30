import { seedData } from '../data/seed';

const STORAGE_KEY = 'pastelaria-fc-demo';

export function initializeData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      ...seedData,
      ...parsed
    };
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
