<template>
  <v-dialog max-width="700">
    <template #default="{ isActive }">
      <v-card title="About Meeting Waste-o-Meter">
        <v-card-text>
          <div class="mb-3">
            Meeting Waste-o-Meter lets you compute the money that gets wasted
            during a senseless meeting without any useful outcome.
          </div>

          <v-expansion-panels v-model="expanded" multiple>
            <release-notes-item
              is-current
              version="v0.1.0"
              :miscellaneous="['Initial release']"
            />
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text="Close"
            variant="tonal"
            rounded="xs"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import ReleaseNotesItem from '@/components/ReleaseNotesItem.vue'
import { ref } from 'vue'

const defaultDependenciesUpdatedMessage = 'Updated dependencies'

const expanded = ref<number | null>(0)
</script>
