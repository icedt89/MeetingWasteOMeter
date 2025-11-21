import { defaultEmojis } from '@/helper/emoji-rain'
import { useWakeLock, watchImmediate } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTheme } from 'vuetify'

const defaultCurrencySymbol = ' €'

export type KnownTheme = 'light' | 'softDark'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const { change: changeTheme } = useTheme()

    const currentTheme = ref<KnownTheme>('softDark')
    watchImmediate(currentTheme, changeTheme)

    const currencySymbol = ref(defaultCurrencySymbol)

    const { isSupported: isWakeLockSupported } = useWakeLock()
    const preventScreenTimeout = ref(isWakeLockSupported.value)

    const isEmojiRainEnabled = ref(true)
    const emojis = ref(defaultEmojis.join(''))
    const emojisArray = computed(() => Array.from(emojis.value || ''))

    function reset() {
      isEmojiRainEnabled.value = true
      preventScreenTimeout.value = true
      currencySymbol.value = defaultCurrencySymbol
      emojis.value = defaultEmojis.join('')
      currentTheme.value = 'softDark'
    }

    return {
      isEmojiRainEnabled,
      currencySymbol,
      emojis,
      emojisArray,
      preventScreenTimeout,
      currentTheme,
      reset,
    }
  },
  {
    persist: true,
  }
)
