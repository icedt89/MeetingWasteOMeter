<template>
  <v-btn
    v-tooltip="'Rename meeting'"
    :icon="mdiPencil"
    variant="text"
    id="rename-meeting-dialog-activator"
    :class="{
      'opacity-50': isNameSet,
    }"
    size="x-small"
    :color="isNameSet ? 'undefined' : 'error'"
    density="comfortable"
  />
  <rename-meeting-dialog activator="#rename-meeting-dialog-activator" />
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js'
import RenameMeetingDialog from '@/components/RenameMeetingDialog.vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { isSet } from '@/helper/validators'

const { name: meetingName } = storeToRefs(useMeetingStore())

const isNameSet = computed(() => isSet(meetingName.value))
</script>
