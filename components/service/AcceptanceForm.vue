<template>
  <v-dialog v-model="dialog" width="900" persistent>
    <v-card>
      <v-card-title class="info white--text py-1">
        <span>پذیرش</span>
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>fal fa-times</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text ref="certRef" class="mt-4">
        <CardWidget title="اطلاعات" class="mb-2">
          <DynamicForm v-model="form" :fields="fields" :edit-item="editItem" />

          <PassengerInfo v-if="passenger" :passenger="passenger" class="mt-2" />
        </CardWidget>

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
                  <span v-if="option.counter > 0" class="pa-2">
                    {{ option.counter }}
                  </span>
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

        <CardWidget title="حمام ها" class="mt-2">
          <div class="d-flex flex-row flex-wrap">
            <RoomWidget
              v-for="service in services"
              :service="service"
              class="col-12 pa-0 ma-1"
              :passenger="passenger"
              :selected-service-items="selectedServiceItems"
              @addServiceItem="
                updateService({ serviceItem: $event, passenger })
              "
            />
          </div>
        </CardWidget>
      </v-card-text>

      <v-card-actions class="mt-3">
        <v-btn
          small
          color="success"
          class="px-6"
          :disabled="!isValid"
          @click="save"
        >
          <v-icon left small>fal fa-check</v-icon><span>ثبت</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { DynamicForm } from 'majra'
import { get as getSafe } from 'lodash'
import RoomWidget from './RoomWidget.vue'
import PassengerInfo from './PassengerInfo.vue'
import validations from '@/helpers/validations'
import { formatNumber } from '~/helpers/invoiceHelpers'
import CardWidget from '~/components/widgets/CardWidget'

export default {
  components: { DynamicForm, PassengerInfo, RoomWidget, CardWidget },

  data() {
    return {
      dialog: false,
      form: {},
      service: {},
      passenger: false,
      editItem: {},
      services: [],
      serviceOptions: [],
      fields: [],
      codeMeliField: {
        title: 'کد ملی',
        field: 'code_meli',
        type: 'text',
        props: {
          rules: [validations.checkMelliCode()],
        },
        col: { md: 4 },
      },
      nameField: {
        title: 'نام و نام خانوادگی',
        field: 'name',
        type: 'text',
        col: { md: 4 },
      },
      selectedServiceItems: [],
    }
  },

  computed: {
    isValid() {
      return (
        this.form.code_meli &&
        this.form.start_date &&
        this.form.name &&
        validations.checkMelliCode()(this.form.code_meli)
      )
    },
    codeMeli() {
      return this.form.code_meli
    },
    startDate() {
      return this.form.start_date
    },
  },

  watch: {
    codeMeli(code) {
      if (typeof code === 'string' && code.length === 10) {
        this.checkCodeMeliExist(code)
      }
    },
    startDate() {
      this.getServices()
    },
  },

  created() {
    this._listen('createBtnCustom', () => {
      const date = new Date()
      this.selectedServiceItems = []
      this.service = {}
      this.form.start_date = date.getHours() + ':' + date.getMinutes()
      this.editItem.start_date = date.getHours() + ':' + date.getMinutes()
      this.dialog = true
      this.getPolicy()
      this.getServiceOptions()
      this.getServices()
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
        this.codeMeliField,
        this.nameField,
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
          col: { md: 4 },
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

    checkHasService() {
      for (const service of this.services) {
        const found = service.service_items.find(
          (i) => i?.passenger?.code_meli === this.form.code_meli
        )
        if (found) return true
      }

      return false
    },

    updateService({ serviceItem, passenger }) {
      if (this.checkHasService()) {
        return this._event('alert', {
          text: 'نهایتا یک حمام رو میتوانید انتخاب کنید',
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

      if (this.selectedServiceItems.length === 1) {
        return this._event('alert', {
          text: 'نهایتا یک حمام رو میتوانید انتخاب کنید',
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

    async getServices() {
      this._event('loading')
      const { Service } = await this.$axios.$get(
        '/passenger/reservable-service-items?start_date=' + this.form.start_date
      )
      this.services = Service
      this._event('loading', false)
    },

    async checkCodeMeliExist(code) {
      const { name } = await this.$axios.$get(`/get-name-driver/${code}`)
      this.form.name = name
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
