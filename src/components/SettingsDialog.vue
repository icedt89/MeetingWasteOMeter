<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text class="pb-0">
          <v-text-field
            label="Currency symbol"
            v-model="currencySymbol"
            hint="Tip: put a space before the symbol"
          />

          <v-card>
            <v-card-title class="pb-0">
              <v-switch
                label="Emoji rain"
                v-model="isFunnyWastingAnimationEnabled"
              >
                <template #append>
                  <v-btn
                    text="Test"
                    size="x-small"
                    variant="tonal"
                    color="undefined"
                    @click="testEmojiRain()"
                  />
                </template>
              </v-switch>
            </v-card-title>
            <v-card-text class="pb-1">
              <v-text-field
                label="Emojis to rain during meeting"
                v-model="emojisProxy"
                hint="Each character is used as emoji"
                :messages="!emojisProxy.length ? 'No emojis to rain' : []"
              />
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useEmojiRain } from '@/helper/emoji-rain'
import { useTimeoutFn } from '@vueuse/core'

const { isFunnyWastingAnimationEnabled, currencySymbol, emojis, emojisArray } =
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

const {
  start: startEmojiRain,
  stop: stopEmojiRain,
  isActive: isEmojiRainActive,
} = useEmojiRain({
  emojis: emojisArray,
})

const { start: startTestEmojiRain } = useTimeoutFn(() => {
  stopEmojiRain()
}, 3_000)

function testEmojiRain() {
  if (isEmojiRainActive.value) {
    return
  }

  startEmojiRain()
  startTestEmojiRain()
}
</script>
