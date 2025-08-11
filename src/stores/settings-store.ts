import { defaultEmojis } from '@/helper/emoji-rain'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultCurrencySymbol = ' €'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const isFunnyWastingAnimationEnabled = ref(true)
    const currencySymbol = ref(defaultCurrencySymbol)
    const emojis = ref(defaultEmojis.join(''))

    function reset() {
      isFunnyWastingAnimationEnabled.value = true
      currencySymbol.value = defaultCurrencySymbol
      emojis.value = defaultEmojis.join('')
    }

    return {
      isFunnyWastingAnimationEnabled,
      currencySymbol,
      emojis,
      reset,
    }
  },
  {
    persist: true,
  }
)
