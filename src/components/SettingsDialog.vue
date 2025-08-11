<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text class="pb-0">
          <v-text-field
            label="Currency symbol"
            v-model="currencySymbol"
            variant="solo"
            hint="Tip: put a space before the symbol"
          />
          <v-switch
            label="Emoji rain"
            v-model="isFunnyWastingAnimationEnabled"
            color="primary"
            density="compact"
            class="ml-1"
            hide-details
          />
          <v-text-field
            label="Emojis"
            v-model="emojisProxy"
            variant="solo"
            hint="Each character is used as emoji"
            :messages="!emojisProxy.length ? 'No emojis to rain' : undefined"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="Close"
            variant="tonal"
            rounded="xs"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { isFunnyWastingAnimationEnabled, currencySymbol, emojis } =
  storeToRefs(useSettingsStore())

const emojisProxy = computed({
  get() {
    if (!emojis.value) {
      return ''
    }

    return emojis.value
  },
  set(newValue: string) {
    if (newValue) {
      newValue = removeAllSpaces(newValue)
    }

    emojis.value = newValue || ''
  },
})

function removeAllSpaces(input: string): string {
  return input.replace(/\s+/g, '')
}
</script>
