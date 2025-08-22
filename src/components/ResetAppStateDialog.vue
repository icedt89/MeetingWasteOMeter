<template>
  <v-dialog max-width="400">
    <template #default="{ isActive }">
      <v-card title="Reset App">
        <v-card-text class="pb-0">
          <div class="mb-3">This will reset the App to their defaults.</div>

          <v-row>
            <v-col>
              <v-checkbox
                label="Current meeting"
                v-model="shouldResetMeetingStore"
              />
            </v-col>
            <v-col>
              <v-checkbox label="Settings" v-model="shouldResetSettingsStore" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button
            text="Reset"
            :disabled="!shouldResetAny"
            @click="resetAppState(isActive)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import { useSettingsStore } from '@/stores/settings-store'
import { computed, ref, type Ref } from 'vue'

const shouldResetSettingsStore = ref(true)
const { reset: resetSettingsStore } = useSettingsStore()

const shouldResetMeetingStore = ref(true)
const { reset: resetMeetingStore } = useMeetingStore()

const shouldResetAny = computed(
  () => shouldResetSettingsStore.value || shouldResetMeetingStore.value
)

function resetAppState(isActive: Ref<boolean>) {
  if (shouldResetSettingsStore.value) {
    resetSettingsStore()
  }

  if (shouldResetMeetingStore.value) {
    resetMeetingStore()
  }

  isActive.value = false
}
</script>
