<template>
  <v-card title="Resources">
    <v-card-text class="pb-0">
      <template v-if="resources.length">
        <resource-input
          v-for="(resource, index) in resources"
          :key="index"
          v-model:name="resource.name"
          v-model:member-count="resource.memberCount"
          v-model:cost-per-hour="resource.costPerHour"
          @resource-deletion-requested="onResourceDeletionRequested(resource)"
        />
      </template>

      <v-alert v-else border="start" type="info" variant="tonal"
        >Add resources to compute the wasted money.</v-alert
      >
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        class="mt-5"
        rounded="xs"
        color="info"
        size="large"
        variant="tonal"
        text="Add resource"
        @click="addResource('Member')"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import type { Resource } from '@/types/resource'
import { storeToRefs } from 'pinia'
import ResourceInput from '@/components/ResourceInput.vue'

const meetingStore = useMeetingStore()
const { resources } = storeToRefs(meetingStore)
const { addResource, removeResource } = meetingStore

function onResourceDeletionRequested(resource: Resource) {
  removeResource(resource)
}
</script>
