<template>
  <timer-controls-button
    :active="isIntervalActive"
    :class="{
      'rounded-te-0 rounded-be-0': isResettable,
    }"
    rounded
    :text="actionText"
    :size="xs ? 'small' : undefined!"
    @click="toggleActivity()"
  />
  <timer-controls-button
    v-if="isResettable"
    class="rounded-ts-0 rounded-bs-0"
    text="Reset"
    rounded
    :size="xs ? 'small' : undefined!"
    @click="resetElapsedSeconds()"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const meetingStore = useMeetingStore()
const { isIntervalActive, elapsedSeconds } = storeToRefs(meetingStore)
const { resetElapsedSeconds, toggleActivity } = meetingStore

const isResettable = computed(() => elapsedSeconds.value > 0)

const actionText = computed(() =>
  !isIntervalActive.value ? 'Waste everyone`s time' : 'Stop wasting time'
)
</script>
