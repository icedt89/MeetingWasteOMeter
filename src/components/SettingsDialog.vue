<template>
  <v-dialog :max-width="500" :fullscreen="xs" :capture-focus="false">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text>
          <v-text-field
            label="Currency symbol"
            v-model="currencySymbol"
            hint="Tip: put a space before the symbol"
          />

          <v-card>
            <v-card-title>
              <v-switch label="Emoji rain" v-model="isEmojiRainEnabled">
                <template #append>
                  <v-btn
                    text="Test"
                    size="small"
                    variant="tonal"
                    color="on-background"
                    @click="testEmojiRain()"
                  />
                </template>
              </v-switch>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Emojis to rain"
                v-model="emojisProxy"
                hint="Each character is used as emoji"
                :messages="
                  !emojisProxy.length ? 'No emojis to rain' : undefined
                "
              />
            </v-card-text>
          </v-card>

          <v-switch
            label="Prevent screen timeout"
            v-model="preventScreenTimeout"
            :disabled="!isWakeLockSupported"
          >
            <template #append>
              <info-icon
                :tooltip-text="
                  isWakeLockSupported
                    ? 'Your device supports this'
                    : 'Your device does not support this'
                "
              />
            </template>
          </v-switch>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isActive.value = false" text="Close" />
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
import { useTimeoutFn, useWakeLock } from '@vueuse/core'
import InfoIcon from '@/components/InfoIcon.vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const {
  isEmojiRainEnabled,
  currencySymbol,
  emojis,
  emojisArray,
  preventScreenTimeout,
} = storeToRefs(useSettingsStore())

const { isSupported: isWakeLockSupported } = useWakeLock()

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
