<template>
  <v-dialog max-width="600">
    <template #default="{ isActive }">
      <v-card title="About Meeting Waste-o-Meter">
        <v-card-text class="pb-0">
          <div class="mb-3">
            Meeting Waste-o-Meter lets you compute the money that gets wasted
            during a senseless meeting without any useful outcome.
          </div>

          <v-expansion-panels v-model="expanded">
            <release-notes-item
              is-current
              version="v0.3.0"
              :new-features="[
                'Custom theme (Github like)',
                'Button to test emoji rain',
              ]"
              :bugfixes="['Raining emojis were behind some UI elements']"
            />
            <release-notes-item
              version="v0.2.1"
              :new-features="['Minor UI changes']"
            />
            <release-notes-item
              version="v0.2.0"
              :new-features="[
                'Made emojis configurable',
                'Layout improvements for mobile devices',
              ]"
            />
            <release-notes-item
              version="v0.1.0"
              :miscellaneous="['Initial release']"
            />
          </v-expansion-panels>

          <div class="mt-3 text-center opacity-50">
            Made with <span class="heart-red">❤</span> by
            <a href="https://jan-hafner.de" target="_blank">Jan Hafner</a>
          </div>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import ReleaseNotesItem from '@/components/ReleaseNotesItem.vue'
import { ref } from 'vue'

const expanded = ref<number | null>(0)
</script>
