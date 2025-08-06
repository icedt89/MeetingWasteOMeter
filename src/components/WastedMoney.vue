<template>
  <div class="d-flex justify-center text-h1 font-weight-bold mt-0 pt-0">
    {{ wastedMoneyFormatted }}{{ currencySymbol }}
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { wastedMoney } = storeToRefs(useMeetingStore())
const { currencySymbol } = storeToRefs(useSettingsStore())

const wastedMoneyFormatted = computed(() => wastedMoney.value.toFixed(2))
</script>
