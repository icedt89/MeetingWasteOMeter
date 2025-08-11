<template>
  <div
    class="font-weight-bold text-h1"
    :class="{ pulsate: isPaused, 'text-h2': xs }"
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
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { format, addSeconds } from 'date-fns'
import { utc } from '@date-fns/utc'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

const { isPaused, elapsedSeconds } = storeToRefs(useMeetingStore())

const { xs } = useDisplay()

const zeroDate = utc(0)
const formattedDuration = computed<string>(() => {
  if (!elapsedSeconds.value) {
    return '00:00:00'
  }

  return format(addSeconds(zeroDate, elapsedSeconds.value), 'HH:mm:ss')
})
</script>
