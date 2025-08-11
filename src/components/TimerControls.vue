<template>
  <v-btn
    :active="isActive"
    stacked
    density="compact"
    class="rounded-te-0 rounded-be-0"
    :text="actionText"
    :size="xs ? 'small' : undefined"
    @click="toggleActivity()"
  />
  <v-btn
    stacked
    density="compact"
    class="rounded-ts-0 rounded-bs-0"
    text="Reset"
    :size="xs ? 'small' : undefined"
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
const { isActive } = storeToRefs(meetingStore)
const { resetElapsedSeconds, toggleActivity } = meetingStore

const actionText = computed(() =>
  !isActive.value ? 'Waste everyone`s time' : 'Stop wasting time'
)
</script>
