<template>
  <v-dialog v-model="dialog" width="900" persistent>
    <v-card>
      <v-card-title class="info white--text py-1">
        <span>پذیرش</span>
        <v-spacer />
        <v-btn icon @click="dialog = false"
          ><v-icon>fal fa-times</v-icon></v-btn
        >
      </v-card-title>

      <v-card-text ref="certRef" class="mt-2">
        <v-slide-x-transition group>
          <div v-if="step == 1" key="1" class="d-flex flex-column align-center">
            <DynamicForm
              v-model="form"
              :fields="fields"
              :edit-item="editItem"
            />

            <PassengerInfo
              v-if="passenger"
              :passenger="passenger"
              class="mt-2"
            />
          </div>

          <div v-if="step == 2" key="2" class="d-flex flex-column align-center">
            <div
              class="my-2 d-flex flex-row pa-0 col-12 align-center justify-space-between px-3"
            >
              <h2>
                <v-icon right>fal fa-bath</v-icon>
                <span>انتخاب حمام</span>
              </h2>

              <div class="d-flex flex-row align-center">
                <v-btn text @click="serviceDialog = true">
                  <v-icon left>fal fa-arrows-alt-h</v-icon>
                  تغییر سرویس
                </v-btn>
              </div>
            </div>

            <RoomWidget
              :service="service"
              :passenger="passenger"
              class="col-12 pa-0"
              @addServiceItem="
                updateService({ serviceItem: $event, passenger })
              "
              :selected-service-items="selectedServiceItems"
            />
          </div>

          <div v-if="step == 3" key="3">
            <CardWidget title="آپشن ها">
              <template #actions>
                <v-btn small class="px-4" color="success" @click="addDefaults">
                  <v-icon left>fal fa-plus</v-icon>
                  <span>افزودن پیشفرض</span>
                </v-btn>
              </template>

              <div
                class="w-full d-flex flex-row flex-wrap align-center align-center"
              >
                <v-card
                  v-for="option in serviceOptions"
                  class="ma-1"
                  min-width="170px"
                  outlined
                >
                  <div
                    class="pa-1 d-flex flex-row justify-space-between align-center"
                  >
                    <div class="d-flex justify-space-between">
                      <span class="ml-3 pr-2">{{ option.title }}</span>
                      <span>{{ formatNumber(option.price) }} تومان</span>
                    </div>
                    <v-spacer />
                    <div class="d-flex align-center mr-3">
                      <v-btn icon small @click="option.counter++">
                        <v-icon small>fal fa-plus</v-icon>
                      </v-btn>
                      <span v-if="option.counter > 0" class="pa-2">{{
                        option.counter
                      }}</span>
                      <v-btn
                        v-if="option.counter > 0"
                        icon
                        small
                        @click="option.counter--"
                      >
                        <v-icon small>fal fa-minus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </div>
            </CardWidget>
          </div>
        </v-slide-x-transition>
      </v-card-text>

      <v-card-actions class="mt-3">
        <v-btn
          v-if="step == 1 || step == 2"
          small
          color="success"
          class="px-6"
          @click="nextStep"
          :disabled="!isValid"
        >
          <v-icon left small>fal fa-arrow-right</v-icon><span>بعدی</span>
        </v-btn>
        <v-btn v-else small color="success" class="px-6" @click="save">
          <v-icon left small>fal fa-check</v-icon><span>ثبت</span>
        </v-btn>
        <v-spacer />
        <v-btn
          small
          color="warning"
          :disabled="step == 1"
          class="px-6"
          @click="step = 1"
        >
          <span>قبلی</span>
          <v-icon right small>fal fa-arrow-left</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="serviceDialog" width="800">
      <v-card>
        <v-card-title class="info white--text py-1">
          <span>اختصاص حمام</span>
          <v-spacer />
          <v-btn icon @click="serviceDialog = false"
            ><v-icon>fal fa-times</v-icon></v-btn
          >
        </v-card-title>

        <v-card-text ref="certRef" class="mt-2">
          <div class="d-flex flex-row flex-wrap align-center justify-center">
            <div
              v-for="fService in services"
              :key="fService.id"
              outlined
              color="gray"
              style="border: 1px solid rgba(0, 0, 0, 0.2)"
              class="py-0 px-1 mx-1 rounded ma-1 cursor-pointer col-3"
              @click=";[(service = fService), (serviceDialog = false)]"
            >
              <div class="font-weight-bold text-center pa-0 col-12">
                اتاق : {{ fService.name }}
              </div>
              <v-progress-linear
                striped
                height="20"
                color="success"
                background-color="error"
                :value="(fService.free_capacity / fService.capacity) * 100"
              >
                {{ fService.free_capacity + '/' + fService.capacity }}
              </v-progress-linear>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { DynamicForm } from 'majra'
import { get as getSafe } from 'lodash'
import RoomWidget from './RoomWidget.vue'
import PassengerInfo from './PassengerInfo.vue'
import { formatNumber } from '~/helpers/invoiceHelpers'
import CardWidget from '~/components/widgets/CardWidget'

export default {
  components: { DynamicForm, PassengerInfo, RoomWidget, CardWidget },

  data() {
    return {
      dialog: false,
      form: {},
      service: {},
      serviceDialog: false,
      passenger: false,
      editItem: {},
      services: [],
      serviceOptions: [],
      step: 1,
      fields: [],
      codeMeli: {
        title: 'کد ملی',
        field: 'passenger_id',
        type: 'select',
        rel: {
          model: 'Passenger',
        },
        events: {
          'click:append': (el) => {
            this._runAfterPageChanged(() => {
              this._event('createBtn')
            })
            this.$router.push('/service/passengers')
          },
        },
        props: {
          'item-text': 'code_meli',
          'item-value': 'id',
          'append-icon': 'fal fa-plus',
        },
        rules: ['required'],
        col: { md: 6 },
      },
      selectedServiceItems: [],
    }
  },

  computed: {
    isValid() {
      return this.form.passenger_id && this.form.start_date
    },
  },

  created() {
    this._listen('createBtnCustom', () => {
      this.selectedServiceItems = []
      this.step = 1
      this.service = {}
      this.dialog = true
      this.getPolicy()
    })

    this._listen('fieldChanged.passenger_id', ({ value }) => {
      this.passenger = this.$majra
        .getItem('Passenger')
        .find((item) => item.id === value)
      this.editItem = { passenger_id: value }
    })
  },

  methods: {
    formatNumber,

    getPolicy() {
      const date = new Date()

      return (this.fields = [
        this.codeMeli,
        {
          title: 'زمان شروع',
          field: 'start_date',
          type: 'date',
          rules: ['required'],
          default: date.getHours() + ':' + date.getMinutes(),
          props: {
            min: date.getHours() + ':' + date.getMinutes(),
            type: 'time',
            format: 'HH:mm',
          },
          col: { md: 6 },
        },
      ])
    },

    async getServiceOptions() {
      this._event('loading')
      const { ServiceOption } = await this.$axios.$get('/service-option')
      this.serviceOptions = ServiceOption.data.map((option) => ({
        ...option,
        counter: 0,
      }))
      this._event('loading', false)
    },

    async getBedRooms() {
      this._event('loading')
      const { Service } = await this.$axios.$get(
        '/passenger/reservable-service-items?start_date=' + this.form.start_date
      )
      this.services = Service
      this._event('loading', false)
    },

    save() {
      this._event('loading', true)

      const options = this.serviceOptions.filter((i) => i.counter > 0)

      this.$axios
        .$post('/service/passenger-form', {
          ...this.form,
          service_items: this.selectedServiceItems,
          options,
        })
        .then((res) => {
          this.dialog = false
          this._event('alert', { text: 'با موفقیت انجام شد', color: 'success' })
          this.$store.dispatch('dynamic/reloadMainData')
        })
        .catch((error) => {
          this._event('alert', {
            text: getSafe(error, 'response.data.message', 'خطا'),
            color: 'error',
          })
        })
        .finally(() => {
          this._event('loading', false)
        })
    },

    isDuplicate(array, id) {
      return array.find((item) => item.id === id)
    },

    async nextStep() {
      if (this.step == 1) {
        await this.getBedRooms()
        this.serviceDialog = true
      }
      if (this.step == 2) {
        await this.getServiceOptions()
      }
      this.step++
    },

    checkHasService() {
      for (const service of this.services) {
        const found = service.service_items.find(
          (i) => i?.passenger?.id === this.form.passenger_id
        )
        if (found) return true
      }

      return false
    },

    updateService({ serviceItem, passenger }) {
      if (this.checkHasService()) {
        return this._event('alert', {
          text: 'نهایتا دو حمام رو میتوانید انتخاب کنید',
          color: 'error',
        })
      }

      const newServiceItem = { ...serviceItem }

      if (serviceItem.passenger && serviceItem.passenger.id !== passenger.id) {
        return this._event('alert', {
          text: 'این حمام قبلا انتخاب شده است',
          color: 'error',
        })
      }

      if (this.selectedServiceItems.length === 2) {
        return this._event('alert', {
          text: 'نهایتا دو حمام رو میتوانید انتخاب کنید',
          color: 'error',
        })
      }

      newServiceItem.passenger = { ...passenger }

      if (this.isDuplicate(this.selectedServiceItems, serviceItem.id)) {
        this.selectedServiceItems = this.selectedServiceItems.filter(
          (item) => item.id !== serviceItem.id
        )
      } else {
        this.selectedServiceItems.push(serviceItem)
      }
    },

    addDefaults() {
      for (const option of this.serviceOptions) {
        if (option.is_default) {
          option.counter++
        }
      }
    },
  },
}
</script>

<style scoped>
.border-left {
  border-left: 1px solid rgba(0, 0, 0, 0.4);
  padding: 3px;
}
</style>
