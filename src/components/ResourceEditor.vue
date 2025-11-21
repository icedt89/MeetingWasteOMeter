<template>
  <v-expansion-panels v-if="resources.length" v-model="expanded">
    <resource-input
      v-for="(resource, index) in resources"
      :key="index"
      v-model:name="resource.name"
      v-model:member-count="resource.memberCount"
      v-model:cost-per-hour="resource.costPerHour"
      :total-resource-cost="computeTotalResourceCost(resource, elapsedSeconds)"
      @resource-deletion-requested="onResourceDeletionRequested(resource)"
    />
  </v-expansion-panels>

  <v-alert v-else border="start" type="info" variant="tonal"
    >Add resources to compute the wasted money.</v-alert
  >
  <v-btn
    block
    class="mt-2"
    :color="resources.length ? 'on-background' : 'primary'"
    size="large"
    :variant="resources.length ? 'tonal' : 'elevated'"
    text="Add resource"
    @click="addNewResource()"
  />
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import type { Resource } from '@/types/resource'
import { storeToRefs } from 'pinia'
import ResourceInput from '@/components/ResourceInput.vue'
import { ref } from 'vue'
import { computeTotalResourceCost } from '@/helper/waste-helper'

const meetingStore = useMeetingStore()
const { resources, elapsedSeconds } = storeToRefs(meetingStore)
const { addNewResource: addNewMeetingResource, removeResource } = meetingStore

const expanded = ref<number | null>()

function addNewResource() {
  addNewMeetingResource('Member', 1, 0)

  expanded.value = resources.value.length - 1
}

function onResourceDeletionRequested(resource: Resource) {
  removeResource(resource)

  expanded.value = null
}
</script>
