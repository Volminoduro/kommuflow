import { defineStore } from 'pinia'
import { DEFAULT_CONFIG } from '@/constants'
import { LS_KEYS } from '@/constants/localStorageKeys'
import { useJsonStore } from '@/stores/useJsonStore'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const useAppStore = defineStore('app', () => {
  const LS_KEY = LS_KEYS.CONFIG
  // Persisted config (merge with defaults)
  const config = useLocalStorage(LS_KEY, { ...DEFAULT_CONFIG }, { deep: true })
  // Ensure missing default keys are present (in case stored value is partial)
  try {
    config.value = { ...DEFAULT_CONFIG, ...config.value }
  } catch (e) {
    config.value = { ...DEFAULT_CONFIG }
  }
  // Compose other stores
  const jsonStore = useJsonStore()

  // Initialize main data on app start
  async function initData(server) {
    try {
      await Promise.all([
        jsonStore.loadAllData(server),
      ])
      // Ensure persisted config.server is valid; if not, set to DEFAULT_CONFIG.server or first available
      try {
        const configured = config.value?.server
        const valid = jsonStore.servers && jsonStore.servers.find(s => s.id === configured)
        if (!valid) {
          const defaultFromConfig = DEFAULT_CONFIG && DEFAULT_CONFIG.server
          const fallback = defaultFromConfig || (jsonStore.servers && jsonStore.servers[0] && jsonStore.servers[0].id)
          if (fallback) {
            config.value = { ...config.value, server: fallback }
          }
        }
      } catch (e) {
        // Non-fatal: if servers not present or check fails, don't block init
        console.warn('Could not ensure default server in config', e)
      }
    } catch (e) {
      console.error('Erreur initData', e)
    }
  }

  return {
    // persisted app-level state
    config,
    initData
  }
})