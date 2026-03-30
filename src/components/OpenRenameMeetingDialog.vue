<template>
  <v-btn
    v-tooltip="'Rename meeting'"
    :icon="mdiPencil"
    variant="text"
    :class="{
      'opacity-50': isNameSet,
    }"
    size="x-small"
    :color="isNameSet ? 'on-background' : 'error'"
    density="comfortable"
    id="rename-meeting-dialog-activator"
    @click="isRenameMeetingDialogOpen = true"
  />
  <rename-meeting-dialog v-model="isRenameMeetingDialogOpen" />
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js'
import RenameMeetingDialog from '@/components/RenameMeetingDialog.vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { isSet } from '@/helper/validators'

const { name: meetingName } = storeToRefs(useMeetingStore())

const isNameSet = computed(() => isSet(meetingName.value))

const isRenameMeetingDialogOpen = ref(false)
</script>
