<template>
  <div class="d-flex flex-row flex-wrap">
    <div class="col-12 py-0">
      <v-card rounded>
        <div
          class="d-flex py-1 justify-center primary mx-10 rounded-b-lg white--text"
        >
          <span class="mx-2">
            ظرفیت باقی مانده :
            {{ getSafe(analyse, 'emptyServiceItems', 0) }} نفر </span
          >|
          <span class="mx-2">
            سرویس داده شده :
            {{ getSafe(analyse, 'fullServiceItems', 0) }} نفر </span
          >|
          <span class="mx-2">
            کل ظرفیت : {{ getSafe(analyse, 'serviceItems', 0) }} نفر
          </span>
        </div>
        <v-card-text class="d-flex flex-row justify-center">
          <v-btn x-large color="success" @click="goToPassengerForms">
            <v-icon left>fal fa-plus</v-icon>
            <span>پذیرش</span>
          </v-btn>
          <v-btn
            to="/service/passengers"
            x-large
            color="success"
            class="mr-1"
          >
            <v-icon left>fal fa-users</v-icon>
            <span>لیست رانندگان</span>
          </v-btn>
          <v-btn to="/service/service" x-large color="success" class="mr-1">
            <v-icon left>fal fa-bath</v-icon>
            <span>سرویس ها</span>
          </v-btn>
          <v-btn
            to="/service/passenger-forms/new"
            x-large
            color="success"
            class="mr-1"
          >
            <v-icon left>fal fa-book</v-icon>
            <span>لیست پذیرش ها</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="col-12">
      <CardWidget title="حمام ها">
        <div class="d-flex flex-row flex-wrap">
          <div
            v-for="(service, index) in $majra.getItem('Service')"
            :key="service.id"
            class="pa-1"
            :class="service.service_items.length > 6 ? 'col-6' : 'col-3'"
          >
            <RoomWidget
              :style="{ opacity: 0, animationDelay: index * 0.2 + 's' }"
              :service="service"
              :actions="false"
              class="up-anim"
              :minimal="true"
            />
          </div>
        </div>
      </CardWidget>
    </div>
  </div>
</template>

<script>
import { get as getSafe } from 'lodash'
import RoomWidget from '~/components/service/RoomWidget.vue'
import CardWidget from '~/components/widgets/CardWidget.vue'

export default {
  components: { CardWidget, RoomWidget },

  layout: 'dashboard',

  data: () => ({
    analyse: {},
  }),

  async created() {
    this.$store.dispatch('dynamic/midit', {
      relations: ['/service'],
    })
    const analyse = await this.$axios.$get('/service/analyse')
    this.analyse = analyse
  },

  mounted() {
    this._event('templateLoaded')
  },

  methods: {
    getSafe,
    goToPassengerForms() {
      this._runAfterPageLoaded(() => {
        this._event('createBtnCustom')
      })
      this.$router.push('/service/passenger-forms/new')
    },
  },
}
</script>

<style scoped>
@keyframes scale {
  0% {
    opacity: 0;
    transform: scale(2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-up {
  0% {
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.up-anim {
  animation: 1s scale forwards;
}

.anim {
  animation: 0.8s scale-up infinite;
}
</style>
