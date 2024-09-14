<template>
  <CardWidget :title="getSafe(service, 'name')" class="border-primary">
    <template #actions>
      <v-chip class="ml-1" outlined small color="success">
        <span class="ml-1">{{ service.free_capacity }}</span>
        <span>حمام</span>
      </v-chip>
      <v-chip class="ml-1" outlined small color="error">
        <span class="ml-1">{{ service.capacity - service.free_capacity }}</span>
        <span>حمام</span>
      </v-chip>
      <!-- <v-btn class="ml-1" small icon><v-icon small>fal fa-plus</v-icon></v-btn> -->
    </template>

    <div class="d-flex align-center justify-center flex-wrap">
      <v-card
        class="d-inline-block ma-2 pa-2 rounded-lg"
        v-for="serviceItems in chunk(getSafe(service, 'service_items', []), 2)"
      >
        <div class="d-flex flex-row flex-wrap align-center justify-center">
          <template v-for="serviceItem in serviceItems">
            <v-btn
              outlined
              v-if="!minimal"
              class="ma-1"
              :color="
                !checkServiceItemHasPassenger(serviceItem) ? 'success' : 'gray'
              "
              @click="actions && chooseServiceItem(serviceItem)"
            >
              <span
                v-if="!selectedServiceItems.find((i) => i.id === serviceItem.id)"
              >
                {{ getSafe(serviceItem, 'passenger.full_name', 'خالی') }}
              </span>
              <span v-else>انتخاب شد</span> |
              <div><span>حمام</span>{{ serviceItem.number }}</div>
            </v-btn>

            <v-btn
              v-else
              icon
              :color="serviceItem.passenger ? 'error' : 'success'"
            >
              <v-tooltip top>
                <template #activator="{ on, attrs }">
                  <span
                    v-on="on"
                    v-bind="attrs"
                    class="rounded-circle d-flex align-center justify-center"
                    style="border: 1px solid; width: 30px; height: 30px"
                    :style="
                      'border-color: ' +
                      (serviceItem.passenger_id
                        ? 'var(-v--error-base)'
                        : 'var(-v--success-base)')
                    "
                    >{{ serviceItem.number }}</span
                  >
                </template>
                <div class="d-flex flex-column align-center">
                  <span>
                    <img
                      :src="
                        getSafe(serviceItem, 'passenger.img')
                          ? url + getSafe(serviceItem, 'passenger.img')
                          : '/avatar.png'
                      "
                      style="
                        border-radius: 10000px;
                        width: 100px;
                        height: 100px;
                      "
                    />
                  </span>
                  <span>
                    نام و نام‌خانوادگی:
                    {{ getSafe(serviceItem, 'passenger.full_name', 'خالی') }}
                  </span>
                  <span>
                    کد ملی:
                    {{ getSafe(serviceItem, 'passenger.code_meli', 'خالی') }}
                  </span>
                </div>
              </v-tooltip>
            </v-btn>
          </template>
        </div>
      </v-card>
    </div>
  </CardWidget>
</template>

<script>
import { get as getSafe, chunk } from 'lodash'
import CardWidget from '../widgets/CardWidget.vue'

export default {
  components: { CardWidget },

  props: {
    service: { default: () => ({}) },
    selectedServiceItems: { default: () => [] },
    passenger: {},
    actions: { default: true },
    minimal: true,
  },

  computed: {
    url() {
      return process.env.baseURL
    },
  },

  methods: {
    chunk,
    getSafe,
    chooseServiceItem(serviceItem) {
      this.$emit('addServiceItem', serviceItem)

      // this._event("loading");
      // this.$axios
      //   .$post("/hostel/choose-bed", {
      //     bed_id: bed.id,
      //     passenger_id: this.passenger.id,
      //     course_id: this.courseId,
      //   })
      //   .then((res) => {
      //     this.service = res.service;
      //     let message = getSafe(res, "message", "با موفقیت ثبت شد") || "با موفقیت ثبت شد";
      //     this._event("alert", {
      //       text: message,
      //       color: "warning",
      //     });
      //   })
      //   .catch((err) => {
      //     this._event("alert", {
      //       text: getSafe(err, "response.data.message"),
      //       color: "error",
      //     });
      //   })
      //   .finally(() => {
      //     this._event("loading", false);
      //   });
    },
    checkServiceItemHasPassenger(serviceItem) {
      return (
        serviceItem.passenger ||
        this.selectedServiceItems.find((i) => i.id === serviceItem.id)
      )
    },
  },
}
</script>
