<template>
  <div
    class="d-flex justify-center font-weight-bold mt-0 pt-0"
    :class="{ 'text-h1': !xs, 'text-h2': xs }"
  >
    {{ wastedMoneyFormatted }}{{ currencySymbol }}
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meeting-store'
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { wastedMoney } = storeToRefs(useMeetingStore())
const { currencySymbol } = storeToRefs(useSettingsStore())

const { xs } = useDisplay()

const wastedMoneyFormatted = computed(() => wastedMoney.value.toFixed(2))
</script>
