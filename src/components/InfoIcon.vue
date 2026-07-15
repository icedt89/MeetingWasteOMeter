<template>
  <v-icon size="small" :icon="mdiInformationOutline" v-tooltip="tooltipText" />
</template>

<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'

interface Props {
  tooltipText: string
  openTooltipOnClick?: boolean
}

withDefaults(defineProps<Props>(), {
  openTooltipOnClick: true,
})
</script>
