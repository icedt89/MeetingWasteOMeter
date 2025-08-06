<template>
  <v-btn
    :active="isActive"
    stacked
    density="comfortable"
    class="rounded-te-0 rounded-be-0"
    :text="actionText"
    @click="toggleActivity()"
  />
  <v-btn
    stacked
    density="comfortable"
    class="rounded-ts-0 rounded-bs-0"
    text="Reset"
    @click="resetElapsedSeconds()"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'

const meetingStore = useMeetingStore()
const { isActive } = storeToRefs(meetingStore)
const { resetElapsedSeconds, toggleActivity } = meetingStore

const actionText = computed(() =>
  !isActive.value ? 'Waste everyone`s time' : 'Stop wasting time'
)
</script>
