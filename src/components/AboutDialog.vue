<template>
  <v-dialog max-width="600" :fullscreen="xs">
    <template #default="{ isActive }">
      <v-card title="About Meeting Waste-o-Meter">
        <v-card-text class="pb-0">
          <div class="mb-4">
            Meeting Waste-o-Meter lets you compute the money that gets wasted
            during a senseless meeting without any useful outcome.
            <br />
            It`s just for fun 🤪.
          </div>

          <v-expansion-panels v-model="releaseNotesExpanded">
            <v-expansion-panel title="Release notes">
              <v-expansion-panel-text>
                <v-expansion-panels v-model="expanded">
                  <release-notes-item
                    is-current
                    version="v0.4.3"
                    :new-features="['Added light theme']"
                  />
                  <release-notes-item
                    version="v0.4.0"
                    :new-features="[
                      'Prevent device from turning off screen',
                      'Added privacy overlay',
                    ]"
                  />
                  <release-notes-item
                    version="v0.3.3"
                    :bugfixes="['Made App icon transparent']"
                  />
                  <release-notes-item
                    version="v0.3.2"
                    :new-features="[
                      'Removed external loading of Google Roboto font',
                    ]"
                  />
                  <release-notes-item
                    version="v0.3.1"
                    :new-features="['Optimized UI for mobile devices']"
                  />
                  <release-notes-item
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
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="mt-3 text-center opacity-50">
            Made with <span class="heart-red">❤</span> by
            <a href="https://jan-hafner.de" target="_blank">Jan Hafner</a>
            <small class="d-block opacity-20">v{{ appVersion }}</small>
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
import { appVersion } from '../environment'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const releaseNotesExpanded = ref<boolean>(false)
const expanded = ref<number | null>(0)
</script>
