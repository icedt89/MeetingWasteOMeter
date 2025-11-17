import { defaultEmojis } from '@/helper/emoji-rain'
import { useWakeLock } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const defaultCurrencySymbol = ' €'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const currencySymbol = ref(defaultCurrencySymbol)

    const { isSupported: isWakeLockSupported } = useWakeLock()
    const preventScreenTimeout = ref(isWakeLockSupported.value)

    const isFunnyWastingAnimationEnabled = ref(true)
    const emojis = ref(defaultEmojis.join(''))
    const emojisArray = computed(() => Array.from(emojis.value || ''))

    function reset() {
      isFunnyWastingAnimationEnabled.value = true
      preventScreenTimeout.value = true
      currencySymbol.value = defaultCurrencySymbol
      emojis.value = defaultEmojis.join('')
    }

    return {
      isFunnyWastingAnimationEnabled,
      currencySymbol,
      emojis,
      emojisArray,
      preventScreenTimeout,
      reset,
    }
  },
  {
    persist: true,
  }
)
