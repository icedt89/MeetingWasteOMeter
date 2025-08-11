import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type Resource } from '@/types/resource'
import { useIntervalFn } from '@vueuse/core'
import { computeWastedMoney } from '@/helper/waste-helper'
import { isResourceValid } from '@/helper/validators'

const defaultMeetingName = 'Another meeting'

export const useMeetingStore = defineStore(
  'meeting',
  () => {
    const name = ref<string>(defaultMeetingName)
    const resources = ref<Resource[]>([])
    const elapsedSeconds = ref<number>(0)

    const {
      isActive,
      pause: pauseInterval,
      resume: resumeInterval,
    } = useIntervalFn(() => elapsedSeconds.value++, 1_000, {
      immediate: false,
    })

    const isPaused = computed(() => !!elapsedSeconds.value && !isActive.value)
    const validResources = computed(() =>
      resources.value.filter((r) =>
        isResourceValid(r.name, r.memberCount, r.costPerHour)
      )
    )
    const hasValidResources = computed(() => validResources.value.length > 0)
    const wastedMoney = computed(() =>
      computeWastedMoney(elapsedSeconds.value, validResources.value)
    )

    function addNewResource(
      name: string,
      memberCount: number,
      costPerHour: number
    ) {
      resources.value.push({
        name: name,
        memberCount: memberCount,
        costPerHour: costPerHour,
      })
    }

    function removeResource(resource: Resource) {
      const resourceIndex = resources.value.indexOf(resource)
      if (resourceIndex === -1) {
        return
      }

      resources.value.splice(resourceIndex, 1)
    }

    function start() {
      if (isActive.value) {
        return
      }

      resumeInterval()
    }

    function stop() {
      if (!isActive.value) {
        return
      }

      pauseInterval()
    }

    function toggleActivity() {
      if (isActive.value) {
        stop()

        return
      }

      start()
    }

    function resetElapsedSeconds() {
      elapsedSeconds.value = 0
    }

    function reset() {
      stop()
      resetElapsedSeconds()

      name.value = defaultMeetingName
      resources.value = []
    }

    return {
      name,
      elapsedSeconds,
      resources,
      isPaused,
      isActive,
      wastedMoney,
      hasValidResources,
      addNewResource,
      removeResource,
      toggleActivity,
      resetElapsedSeconds,
      reset,
    }
  },
  {
    persist: true,
  }
)
