<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Set elapsed time">
        <v-card-text>
          <v-row>
            <v-col>
              <v-number-input
                v-model="hours"
                hide-details
                :min="0"
                :max="23"
                label="Hours"
                class="hours"
              />
            </v-col>
            <v-col>
              <v-number-input
                v-model="minutes"
                hide-details
                :min="0"
                :max="59"
                label="Minutes"
                class="minutes"
              />
            </v-col>
            <v-col>
              <v-number-input
                v-model="seconds"
                hide-details
                :min="0"
                :max="59"
                label="Seconds"
                class="seconds"
              />
            </v-col>
            <v-col align="right">
              <v-btn
                stacked
                variant="elevated"
                density="comfortable"
                @click="setElapsedTime()"
              >
                Set<br />{{ formattedTimerDisplay }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped>
:deep(.v-number-input.hours .v-field) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

:deep(.v-number-input.minutes .v-field) {
  border-radius: 0;
  border-left: 0 !important;
  border-right: 0 !important;
}

:deep(.v-number-input.seconds .v-field) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>

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
