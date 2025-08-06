<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text>
          <v-text-field
            label="Currency symbol"
            v-model="currencySymbol"
            variant="solo"
            hint="Tip: put a space before the symbol"
          />
          <v-switch
            label="Enable very funny wasting animation"
            v-model="isFunnyWastingAnimationEnabled"
            color="primary"
            density="compact"
            class="ml-1"
            hide-details
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
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'

const { isFunnyWastingAnimationEnabled, currencySymbol } =
  storeToRefs(useSettingsStore())
</script>
