<template>
  <v-dialog max-width="400">
    <template #default="{ isActive }">
      <v-card title="Set elapsed time">
        <v-card-text>
          <v-container class="pa-0" fluid>
            <v-row no-gutters>
              <v-col>
                <v-number-input
                  v-model="hours"
                  hide-details
                  type="number"
                  variant="solo-filled"
                  control-variant="stacked"
                  density="comfortable"
                  :precision="0"
                  :min="0"
                  :max="23"
                  label="Hours"
                />
              </v-col>
              <v-col>
                <v-number-input
                  v-model="minutes"
                  hide-details
                  type="number"
                  variant="solo-filled"
                  control-variant="stacked"
                  density="comfortable"
                  :precision="0"
                  :min="0"
                  :max="59"
                  label="Minutes"
                />
              </v-col>
              <v-col>
                <v-number-input
                  v-model="seconds"
                  hide-details
                  type="number"
                  variant="solo-filled"
                  control-variant="stacked"
                  density="comfortable"
                  :precision="0"
                  :min="0"
                  :max="59"
                  label="Seconds"
                />
              </v-col>
              <v-col cols="auto" align-self="center">
                <v-btn
                  variant="elevated"
                  text="Set"
                  class="ml-2"
                  rounded="xs"
                  @click="setElapsedTime()"
                />
              </v-col>
            </v-row>
          </v-container>
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

<style lang="scss" scoped>
:deep(.v-number-input__control) {
  width: 24px;
}
</style>

<script setup lang="ts">
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
      hours: splitHours,
      minutes: splitMinutes,
      seconds: splitSeconds,
    } = splitElapsedSeconds(v)

    hours.value = splitHours
    minutes.value = splitMinutes
    seconds.value = splitSeconds
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

function setElapsedTime() {
  storedElapsedSeconds.value = elapsedSeconds.value
}

function splitElapsedSeconds(elapsedSeconds: number): {
  hours: number
  minutes: number
  seconds: number
} {
  const hours = Math.floor(elapsedSeconds / 3600)
  const remainderAfterHours = elapsedSeconds % 3600

  const minutes = Math.floor(remainderAfterHours / 60)
  const seconds = remainderAfterHours % 60

  return { hours, minutes, seconds }
}
</script>
