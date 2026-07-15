<template>
  <v-overlay v-model="show" persistent :opacity="1" width="100%" height="100%">
    <div
      class="d-flex justify-center align-center flex-column"
      style="height: 100%"
    >
      <div>
        <timer-display class="text-white" />
      </div>
      <div>
        <timer-controls />
      </div>
      <div class="mt-10">
        <v-btn
          @click="show = false"
          text="Close"
          variant="tonal"
          color="white"
          size="x-large"
          class="opacity-50"
        />
      </div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
import TimerControls from '@/components/TimerControls.vue'
import TimerDisplay from '@/components/TimerDisplay.vue'

const show = defineModel<boolean>({
  required: true,
})
</script>
