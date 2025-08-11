<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="pl-4">
      <v-icon
        :icon="mdiAccount"
        class="mr-2"
        :color="isResourceValid ? undefined : 'error'"
      />
      {{ name }} wasted&nbsp;<strong
        >{{ totalResourceCost.toFixed(2) }}{{ currencySymbol }}</strong
      >
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-3">
      <v-container class="pa-0 mb-3" fluid>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="name"
              density="comfortable"
              variant="solo-filled"
              :rules="[
                (v: string | number | null | undefined) =>
                  isSet(v) || 'Please enter a name for the resource',
              ]"
              label="Name"
              required
            />
          </v-col>
          <v-col cols="5" sm="2">
            <v-number-input
              v-model="memberCount"
              density="comfortable"
              variant="solo-filled"
              :min="1"
              control-variant="stacked"
              :rules="[
                (v: string | number | null | undefined) =>
                  isSet(v) || 'Please enter the count of members',
                (v: number) =>
                  isMemberCountValid(v) ||
                  'Please enter a value greater than 0',
              ]"
              label="Count"
              hint="Count of members"
              required
            />
          </v-col>
          <v-col cols="7" sm="4">
            <v-number-input
              v-model="costPerHour"
              :precision="2"
              :step="10"
              :min="0"
              density="comfortable"
              variant="solo-filled"
              control-variant="stacked"
              :rules="[
                (v: string | number | null | undefined) =>
                  isSet(v) || 'Please enter the cost per hour',
                (v: number) =>
                  isCostPerHourValid(v) ||
                  'Please enter a value greater than 0',
              ]"
              label="Cost"
              hint="Cost per hour"
              validate-on="input eager"
              required
            >
              <template #append>
                <v-tooltip text="Remove" open-delay="500">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="text"
                      color="error"
                      :icon="mdiDeleteForever"
                      @click="$emit('resource-deletion-requested')"
                    />
                  </template>
                </v-tooltip>
              </template>
            </v-number-input>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<style lang="scss" scoped>
:deep(.v-number-input__control) {
  width: 24px;
}
</style>

<script setup lang="ts">
import {
  isSet,
  isMemberCountValid,
  isCostPerHourValid,
  isResourceValid as isResourceValidFunc,
} from '@/helper/validators'
import { useSettingsStore } from '@/stores/settings-store'
import { mdiDeleteForever, mdiAccount } from '@mdi/js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { currencySymbol } = storeToRefs(useSettingsStore())

defineProps<{
  totalResourceCost: number
}>()

defineEmits<{
  (e: 'resource-deletion-requested'): void
}>()

const name = defineModel<string>('name', {
  required: true,
  default: '',
})
const memberCount = defineModel<number>('memberCount', {
  required: true,
  default: 0,
})
const costPerHour = defineModel<number>('costPerHour', {
  required: true,
  default: 0,
})

const isResourceValid = computed(() =>
  isResourceValidFunc(name.value, memberCount.value, costPerHour.value)
)
</script>
