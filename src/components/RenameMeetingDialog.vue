<template>
  <v-dialog :max-width="500" :fullscreen="xs" :capture-focus="false">
    <template #default="{ isActive }">
      <v-card title="Rename meeting">
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="[
              (v: string | number | null | undefined) =>
                isSet(v) || 'Please enter a name for the meeting',
            ]"
            label="Name"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isActive.value = false" text="Close" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { isSet } from '@/helper/validators'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const { name } = storeToRefs(useMeetingStore())
</script>
