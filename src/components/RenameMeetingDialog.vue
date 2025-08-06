<template>
  <v-dialog max-width="400">
    <template #default="{ isActive }">
      <v-card title="Rename meeting">
        <v-card-text class="pb-0">
          <v-text-field
            v-model="name"
            density="comfortable"
            variant="solo-filled"
            :rules="[
              (v: string | number | null | undefined) =>
                isSet(v) || 'Please enter a name for the meeting',
            ]"
            label="Name"
            required
          />
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

<script setup lang="ts">
import { isSet } from '@/helper/validators'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'

const { name } = storeToRefs(useMeetingStore())
</script>
