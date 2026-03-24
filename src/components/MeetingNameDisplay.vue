<template>
  <div class="text-headline-small d-flex">
    {{ meetingName }}<open-rename-meeting-dialog />
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import OpenRenameMeetingDialog from '@/components/OpenRenameMeetingDialog.vue'

const { name: meetingName } = storeToRefs(useMeetingStore())
</script>
