<template>
  <div
    class="font-weight-bold text-display-large text-sm-display-larger"
    :class="{ pulsate: isPaused }"
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
import { formatTimerDisplay, getTimerDisplayParts } from '@/helper/timer-helper'

const { isPaused, elapsedSeconds } = storeToRefs(useMeetingStore())

const formattedDuration = computed<string>(() => {
  const {
    hours: hoursPart,
    minutes: minutesPart,
    seconds: secondsPart,
  } = getTimerDisplayParts(elapsedSeconds.value)

  return formatTimerDisplay(hoursPart, minutesPart, secondsPart)
})
</script>
