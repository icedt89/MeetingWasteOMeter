<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Set elapsed time">
        <v-card-text>
          <v-row :no-gutters="false">
            <v-col cols="12" sm="4">
              <v-number-input
                v-model="hours"
                hide-details
                :min="0"
                :max="23"
                label="Hours"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-number-input
                v-model="minutes"
                hide-details
                :min="0"
                :max="59"
                label="Minutes"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-number-input
                v-model="seconds"
                hide-details
                :min="0"
                :max="59"
                label="Seconds"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Set" variant="elevated" @click="setElapsedTime()" />
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { formatTimerDisplay, getTimerDisplayParts } from '@/helper/timer-helper'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const { elapsedSeconds: storedElapsedSeconds } = storeToRefs(useMeetingStore())

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

watch(
  storedElapsedSeconds,
  (v) => {
    const {
      hours: hoursPart,
      minutes: minutesPart,
      seconds: secondsPart,
    } = getTimerDisplayParts(v)

    hours.value = hoursPart
    minutes.value = minutesPart
    seconds.value = secondsPart
  },
  {
    immediate: true,
    once: true,
  }
)

const elapsedSeconds = computed(() => {
  const hoursInMinutes = hours.value * 60
  const minutesInSeconds = (hoursInMinutes + minutes.value) * 60

  return minutesInSeconds + seconds.value
})

const formattedTimerDisplay = computed(() =>
  formatTimerDisplay(hours.value || 0, minutes.value || 0, seconds.value || 0)
)

function setElapsedTime() {
  storedElapsedSeconds.value = elapsedSeconds.value
}
</script>
