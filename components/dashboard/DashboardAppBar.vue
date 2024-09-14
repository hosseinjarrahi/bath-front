<template>
  <v-app-bar
    absolute
    app
    flat
    class="mt-4 px-xs-0 px-lg-16 mx-xs-0 mx-lg-3"
    :clipped-left="$vuetify.rtl"
  >
    <v-btn
      v-if="$vuetify.breakpoint.xs || !rightDrawer"
      icon
      color="blueLogo"
      @click.stop="$emit('changeRightDrawer', !rightDrawer)"
    >
      <v-icon size="40">mdi-menu</v-icon>
    </v-btn>

    <span v-else>
      <v-btn
        v-if="!$vuetify.breakpoint.xs"
        icon
        color="blueLogo"
        @click="$emit('changeMini', !mini)"
      >
        <v-icon size="40" v-if="!mini">{{
          $vuetify.rtl ? 'mdi-chevron-right' : 'mdi-chevron-left'
        }}</v-icon>
        <v-icon size="40" v-else>
          {{ !$vuetify.rtl ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon
        >
      </v-btn>
    </span>

    <Clock />
    <!-- <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon
        v-if="!$vuetify.theme.dark"
        color="grey"
      >fal fa-lamp
      </v-icon>
      <v-icon v-else color="yellow">fas fa-lamp</v-icon>
    </v-btn> -->
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          large
          elevation="0"
          dark
          class="white mx-1"
          icon
        >
          <v-icon size="22" color="#94a3b8">fal fa-calendar-alt</v-icon>
        </v-btn>
      </template>
      <span> تقویم </span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          large
          elevation="0"
          dark
          class="white mx-1"
          icon
        >
          <v-icon size="22" color="#94a3b8">fal fa-camera</v-icon>
        </v-btn>
      </template>
      <span> دوربین ها </span>
    </v-tooltip>

    <UserMenu />
  </v-app-bar>
</template>

<script>
import { get as getSafe } from 'lodash'
import UserMenu from '~/components/dashboard/DashboardAppBarUserMenu'
import Clock from '@/components/utilities/Clock.vue'

export default {
  name: 'DashboardAppBar',

  components: {
    UserMenu,
    Clock,
  },

  props: {
    rightDrawer: { type: Boolean, default: true },
    mini: { type: Boolean, default: true },
  },

  methods: { getSafe },
}
</script>
