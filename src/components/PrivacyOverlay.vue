<template>
  <v-overlay
    v-model="show"
    :close-on-back="false"
    :close-on-content-click="false"
    persistent
    :opacity="1"
    width="100%"
    height="100%"
  >
    <div
      class="w-100 d-flex justify-center align-center flex-column"
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
import TimerControls from './TimerControls.vue'
import TimerDisplay from './TimerDisplay.vue'

const show = defineModel<boolean>({
  required: true,
})
</script>
