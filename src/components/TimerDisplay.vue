<template>
  <div
    class="font-weight-bold"
    :class="{ pulsate: isPaused, 'text-h1': !xs, 'text-h2': xs }"
  >
    {{ formattedDuration }}
  </div>
</template>

<style lang="scss" scoped>
.pulsate {
  animation: pulsate 1s ease-in-out infinite;
}

@keyframes pulsate {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { formatTimerDisplay, getTimerDisplayParts } from '@/helper/timer-helper'

const { isPaused, elapsedSeconds } = storeToRefs(useMeetingStore())

const { xs } = useDisplay()

const formattedDuration = computed<string>(() => {
  const {
    hours: hoursPart,
    minutes: minutesPart,
    seconds: secondsPart,
  } = getTimerDisplayParts(elapsedSeconds.value)

  return formatTimerDisplay(hoursPart, minutesPart, secondsPart)
})
</script>
