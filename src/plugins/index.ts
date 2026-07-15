/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from '@/plugins/vuetify'
import { pinia } from '@/stores'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app.use(pinia).use(vuetify)
}
