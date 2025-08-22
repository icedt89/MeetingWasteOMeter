/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md3 } from 'vuetify/blueprints'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { en } from 'vuetify/locale'
import { github } from './github-theme'
import { VAvatar, VBtn, VList, VRow } from 'vuetify/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'github',
    themes: {
      github,
    },
  },
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'en',
    messages: { en },
  },
  aliases: {
    CloseDialogButton: VBtn,
    MainRow: VRow,
    TimerControlsButton: VBtn,
    AppIconAvatar: VAvatar,
    AppMainMenu: VList,
  },
  defaults: {
    CloseDialogButton: {
      text: 'Close',
      color: 'undefined',
      variant: 'text',
    },
    MainRow: {
      dense: true,
      noGutters: true,
      justify: 'center',
      align: 'center',

      VCol: {
        cols: 'auto',
      },
    },
    TimerControlsButton: {
      stacked: true,
      density: 'compact',
      color: 'primary',
    },
    AppIconAvatar: {
      border: true,
      variant: 'text',
      size: 44,
      class: 'mr-1',
    },
    AppMainMenu: {
      activatable: true,
      border: true,
      density: 'compact',
      slim: true,
      style: {
        'background-color': 'rgb(var(--v-theme-background))',
        padding: 0,
      },
    },

    VTooltip: {
      openDelay: 500,
    },
    VAppBar: {
      border: 'b-sm',
    },
    VBtn: {
      rounded: 'xs',
    },
    VRow: {
      noGutters: true,
      dense: true,
    },
    VContainer: {
      fluid: true,
    },
    VCard: {
      border: true,
      color: 'rgb(var(--v-theme-background))',
      rounded: 'xs',
    },
    VExpansionPanels: {
      static: true,
      multiple: true,
    },
    VExpansionPanel: {
      style: {
        'background-color': 'rgb(var(--v-theme-background))',
        border: '1px solid rgb(var(--v-border-color), var(--v-border-opacity))',
      },
    },
    VSwitch: {
      color: 'primary',
      hideDetails: true,
      density: 'comfortable',
    },
    VCheckbox: {
      color: 'primary',
      hideDetails: true,
      density: 'comfortable',
    },
    VNumberInput: {
      variant: 'solo-filled',
      controlVariant: 'stacked',
      type: 'number',
      validateOn: 'eager',
    },
    VTextField: {
      bgColor: 'rgb(var(--v-theme-background))',
      variant: 'solo-filled',
      validateOn: 'eager',

      VField: {
        style: {
          border:
            '1px solid rgb(var(--v-border-color), var(--v-border-opacity))',
        },
      },
    },
  },
})
