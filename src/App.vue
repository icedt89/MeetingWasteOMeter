<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <app-icon-avatar>
          <v-icon size="36">
            <!-- I don`t know how to simply display the "logo.svg" from "public" or "assets" folder =( -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <rect width="100%" height="100%" fill="#141b22" />
              <path
                fill="#fff"
                d="M6,19L6,7L11.07,7L18,11L18,19C18,20.097 17.097,21 16,21L8,21C6.903,21 6,20.097 6,19ZM13.033,17.441C12.068,17.441 11.226,16.893 10.809,16.09L13.033,16.09L13.42,15.317L10.554,15.317C10.535,15.19 10.523,15.062 10.523,14.931C10.523,14.8 10.535,14.672 10.554,14.545L13.033,14.545L13.42,13.772L10.809,13.772C11.226,12.969 12.068,12.421 13.033,12.421C13.655,12.421 14.227,12.648 14.667,13.027L15.351,12.343C14.737,11.791 13.922,11.455 13.033,11.455C11.519,11.455 10.237,12.421 9.75,13.772L8.399,13.772L8.012,14.545L9.581,14.545C9.557,14.672 9.557,14.8 9.557,14.931C9.557,15.062 9.557,15.19 9.581,15.317L8.399,15.317L8.012,16.09L9.75,16.09C10.237,17.441 11.519,18.407 13.033,18.407C13.926,18.407 14.737,18.071 15.351,17.519L14.663,16.835C14.227,17.214 13.659,17.441 13.033,17.441ZM20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91Z"
              />
            </svg>
          </v-icon>
        </app-icon-avatar>
        Meeting Waste-o-Meter</v-app-bar-title
      >
      <template #append>
        <v-menu>
          <template #activator="{ props }">
            <v-btn :icon="mdiDotsVertical" v-bind="props" />
          </template>

          <template #default>
            <app-main-menu activatable>
              <v-list-item :prepend-icon="mdiIncognito" title="Privacy overlay">
                <privacy-overlay
                  v-model="showPrivacyOverlay"
                  activator="parent"
                />
              </v-list-item>
              <v-divider />
              <v-list-item
                :prepend-icon="mdiTimelapse"
                title="Set elapsed time"
              >
                <set-elapsed-time-dialog activator="parent" />
              </v-list-item>
              <v-list-item :prepend-icon="mdiCog" title="Settings">
                <settings-dialog activator="parent" />
              </v-list-item>
              <switch-theme-list-item />
              <v-divider />
              <v-list-item title="Reset App">
                <reset-app-state-dialog activator="parent" />

                <template #prepend>
                  <!-- Reserve space for item without icon -->
                  <div style="width: 44px"></div>
                </template>
              </v-list-item>
              <v-divider />
              <v-list-item :prepend-icon="mdiInformationOutline" title="About">
                <about-dialog activator="parent" />
              </v-list-item>
            </app-main-menu>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <v-container :class="{ 'pt-10': !xs }">
        <main-row>
          <v-col>
            <meeting-name-display />
          </v-col>
        </main-row>
        <main-row>
          <v-col>
            <timer-display />
          </v-col>
        </main-row>
        <main-row>
          <v-col>
            <timer-controls />
          </v-col>
        </main-row>
        <main-row>
          <v-col cols="undefined">
            <v-divider
              :class="{
                'mt-10 mb-7': !xs,
                'mt-5 mb-3': xs,
              }"
            />
          </v-col>
        </main-row>
        <main-row v-if="hasValidResources">
          <v-col>
            <div class="d-flex justify-center text-h5">Totally wasted</div>
            <wasted-money />
          </v-col>
        </main-row>
        <main-row class="ml-auto mr-auto" style="max-width: 700px">
          <v-col
            :cols="12"
            :class="{
              'mt-10': hasValidResources && !xs,
              'mt-5': hasValidResources && xs,
            }"
          >
            <resource-editor />
          </v-col>
        </main-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiInformationOutline,
  mdiCog,
  mdiTimelapse,
  mdiIncognito,
} from '@mdi/js'
import AboutDialog from '@/components/AboutDialog.vue'
import TimerDisplay from '@/components/TimerDisplay.vue'
import TimerControls from '@/components/TimerControls.vue'
import { useEmojiRain } from '@/helper/emoji-rain'
import { ref, watch } from 'vue'
import { useMeetingStore } from '@/stores/meeting-store'
import { storeToRefs } from 'pinia'
import ResourceEditor from '@/components/ResourceEditor.vue'
import WastedMoney from '@/components/WastedMoney.vue'
import MeetingNameDisplay from '@/components/MeetingNameDisplay.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import { useSettingsStore } from '@/stores/settings-store'
import SetElapsedTimeDialog from '@/components/SetElapsedTimeDialog.vue'
import ResetAppStateDialog from '@/components/ResetAppStateDialog.vue'
import { useDisplay } from 'vuetify'
import { useWakeLock, watchImmediate } from '@vueuse/core'
import PrivacyOverlay from '@/components/PrivacyOverlay.vue'
import SwitchThemeListItem from '@/components/SwitchThemeListItem.vue'

const { xs } = useDisplay()

const showPrivacyOverlay = ref(false)

const { isIntervalActive, hasValidResources } = storeToRefs(useMeetingStore())

const { isEmojiRainEnabled, emojisArray, preventScreenTimeout } =
  storeToRefs(useSettingsStore())

const { start: startEmojiRain, stop: stopEmojiRain } = useEmojiRain({
  emojis: emojisArray,
})

const { release: releaseWakeLock, request: requestWakeLock } = useWakeLock()

watchImmediate([isIntervalActive, preventScreenTimeout], ([iia, pst]) => {
  if (iia && pst) {
    requestWakeLock('screen')

    return
  }

  releaseWakeLock()
})

watch(
  [isIntervalActive, isEmojiRainEnabled, showPrivacyOverlay],
  ([iia, iere, spo]) => {
    if (iia && iere && !spo) {
      startEmojiRain()

      return
    }

    stopEmojiRain()
  }
)
</script>
