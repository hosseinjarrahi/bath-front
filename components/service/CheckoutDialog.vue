<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span> تسویه </span>
        <span> {{ getSafe(passengerForm, 'passenger.full_name') }} </span>
        <v-spacer />
        <v-btn color="error" icon @click="dialog = false">
          <v-icon>fal fa-times</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <DynamicForm v-model="form" :fields="checkoutFields" />
      </v-card-text>
      <v-card-text v-if="delayPrice !== false">
        <v-alert color="warning">
          <span>هزینه تاخیر </span>
          <span>{{ diff }}</span>
          <span> دقیقه </span>
          <span>{{ formatNumber(this.delayPrice) }}</span>
          <span> تومان </span>
          <span> می باشد</span>
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="delayPrice === false"
          :loading="loading"
          class="px-10"
          small
          color="success"
          @click="checkout"
        >
          بررسی هزینه تاخیر
        </v-btn>
        <v-btn
          v-else
          :loading="loading"
          class="px-10"
          small
          color="success"
          @click="pay"
        >
          پرداخت و تسویه
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import pos from '~/helpers/pos'
import { DynamicForm } from 'majra'
import { get as getSafe } from 'lodash'
import { formatNumber } from '~/helpers/invoiceHelpers'

const defineFields = (thiz) => {
  const date = new Date()

  return [
    {
      title: 'خسارت (تومان)',
      field: 'damage',
      type: 'text',
      props: {
        type: 'number',
      },
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'تاریخ تسویه',
      field: 'checkout_date',
      type: 'date',
      default: date.getHours() + ':' + date.getMinutes(),
      props: {
        type: 'time',
        format: 'HH:mm',
        simple: true,
      },
      rules: ['required'],
      col: { md: 6 },
      events: {
        change() {
          thiz.delayPrice = false
        },
      },
    },
  ]
}

export default {
  components: { DynamicForm },

  data() {
    return {
      passengerForm: {},
      form: false,
      dialog: false,
      loading: false,
      delayPrice: false,
      diff: 0,
      checkoutFields: defineFields(this),
    }
  },

  created() {
    this._listen('checkout.dialog', (item) => {
      this.passengerForm = item
      this.dialog = true
      this.delayPrice = false
    })
  },

  methods: {
    getSafe,
    formatNumber,

    pay() {
      const price = +this.form.damage + +this.delayPrice

      pos.send(price, '/payment/' + this.passengerForm.id, (data) => {
        this.addPayment(data, price).then(() => {
          this.checkout()
        })
      })
    },

    addPayment(trace, price) {
      return this.$axios
        .$post(`/payment`, {
          Payment: {
            paymentable_id: this.passengerForm.id,
            paymentable_type: this.passengerForm.paymentable,
            amount: price,
            reference: trace.rrn,
            response: trace,
            status: 'Payed',
            gateway: 'pos',
          },
        })
        .then(() => {
          this.$store.dispatch('dynamic/reloadMainData')
        })
    },

    async checkout() {
      this.loading = true

      const response = await this.$axios.$post('/service/checkout', {
        ...this.form,
        passenger_form_id: this.passengerForm.id,
        checked: this.delayPrice !== false,
      })

      this.loading = false

      if ('delay_price' in response) {
        this.delayPrice = response.delay_price
        this.diff = response.diff
        return
      }

      const { message, passenger } = response
      this._event('alert', { text: message, color: 'success' })
      this.dialog = false
      this.form.damage = 0
      this.$store.dispatch('dynamic/reloadMainData')
    },
  },
}
</script>
