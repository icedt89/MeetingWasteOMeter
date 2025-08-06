import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const isFunnyWastingAnimationEnabled = ref(true)
    const currencySymbol = ref(' €')

    function reset() {
      isFunnyWastingAnimationEnabled.value = true
      currencySymbol.value = ' €'
    }

    return {
      isFunnyWastingAnimationEnabled,
      currencySymbol,
      reset,
    }
  },
  {
    persist: true,
  }
)
