<template>
  <div class="text-headline-small d-flex">
    {{ meetingName }}<open-rename-meeting-dialog-btn />
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import OpenRenameMeetingDialogBtn from '@/components/OpenRenameMeetingDialogBtn.vue'

const { name: meetingName } = storeToRefs(useMeetingStore())
</script>
