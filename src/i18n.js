// Chargement dynamique des fichiers de langue (names)

import { ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const currentLang = useLocalStorage('lang', 'fr')
export const translations = ref({})



export async function loadLang(lang) {
  try {
    const data = await fetch(`/names/${lang}.json`).then(r => r.json())
    const result = {}
    for (const key in data) {
      if (Array.isArray(data[key])) {
        // Catégorie de type tableau d'objets {id, name}
        result[key] = {}
        for (const entry of data[key]) {
          if (entry.id !== undefined && entry.name !== undefined) {
            result[key][entry.id] = entry.name
          }
        }
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        // Catégorie de type objet plat (ex: divers)
        result[key] = { ...data[key] }
      }
    }
    translations.value = result
    currentLang.value = lang
  } catch (e) {
    translations.value = {}
  }
}


// Traduction par catégorie et clé
export function t(category, key) {
  if (translations.value[category] && translations.value[category][key] !== undefined) {
    return translations.value[category][key]
  }
  return key
}

// Pour compatibilité : tDivers(key) => t('divers', key)
export function tDivers(key) {
  return t('divers', key)
}

// Charger la langue sauvegardée au démarrage
if (currentLang.value) {
  loadLang(currentLang.value)
}
