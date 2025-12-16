
import { createI18n } from 'vue-i18n'

// Fonction utilitaire pour charger dynamiquement les fichiers JSON de traduction
async function loadLocaleMessages() {
  const locales = import.meta.glob('./names/*.json', { eager: true })
  const messages = {}
  for (const path in locales) {
    // Récupère le code langue à partir du nom de fichier (ex: fr.json)
    const match = path.match(/\/([a-z]{2})\.json$/i)
    if (match) {
      const lang = match[1]
      // On place tout le contenu du JSON sous la clé racine (ex: divers, items, ...)
      messages[lang] = locales[path].default || locales[path]
    }
  }
  return messages
}

const messagesPromise = loadLocaleMessages()

export async function createI18nInstance(locale = 'fr') {
  const messages = await messagesPromise
  return createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'fr',
    messages
  })
}
