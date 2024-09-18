<template>
  <DynamicTemplate>
    <template #actions="item">
      <v-btn
        v-if="getSafe(item, 'balance', 0) > 0"
        small
        text
        @click="pay(item)"
      >
        <v-icon small left>fal fa-money-bill</v-icon>
        <span>پرداخت</span>
      </v-btn>
      <v-btn
        v-else
        :disabled="!getSafe(item, 'passenger.has_residence')"
        small
        text
        @click="_event('checkout.dialog', item)"
      >
        <v-icon small left>fal fa-check</v-icon>
        <span>تسویه</span>
      </v-btn>
    </template>

    <template #header-btn>
      <div
        class="px-8 py-1 mx-4 rounded-lg"
        style="border: 1px solid rgba(0, 0, 0, 0.3)"
      >
        <v-radio-group v-model="payMethod" hide-details row class="mt-0">
          <v-radio value="manual" label="پرداخت دستی" dense></v-radio>
          <v-radio value="pos" label="پرداخت با پوز" dense></v-radio>
        </v-radio-group>
      </div>

      <v-spacer />

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            small
            outlined
            class="ml-3"
            color="success"
            elevation="0"
            max-width="30px"
            max-height="30px"
            @click="_event('createBtnCustom')"
          >
            <v-icon size="18">mdi mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ translate('Add') }}</span>
      </v-tooltip>

      <AcceptanceForm />

      <CheckoutDialog :pay-methos="payMethod" />
    </template>
  </DynamicTemplate>
</template>

<script>
import pos from '~/helpers/pos'
import fields from './fields'
import { DynamicTemplate } from 'majra'
import { get as getSafe } from 'lodash'
import { connector } from '~/helpers/osConnector'
import AcceptanceForm from '@/components/service/AcceptanceForm'
import CheckoutDialog from '@/components/service/CheckoutDialog'

export default {
  components: { DynamicTemplate, AcceptanceForm, CheckoutDialog },

  layout: 'dashboard',

  data() {
    return {
      shouldPay: {},
      payMethod: 'pos',
    }
  },

  beforeCreate() {
    const type = this.$route.params.type

    const query = type === 'archive' ? '' : '&filters[checkout_date][$null]'

    this.$majra.init({
      hiddenActions: ['create', 'edit', 'delete'],
      mainRoute: {
        route: '/passenger-form?_with=serviceOptions' + query,
        key: 'PassengerForm',
      },
      relations: [{ route: '/passenger', key: 'Passenger' }],
      fields: fields(this),
    })
  },

  created() {
    connector((socket) => {
      this.osConnected = true

      socket.addEventListener('close', () => {
        this.osConnected = false
      })

      socket.addEventListener('error', () => {
        this.osConnected = false
        this._event('alert', { color: 'error', text: 'عدم اتصال به پوز' })
      })

      pos.init(this._event)
    })
  },

  mounted() {
    const interVal = setInterval(() => {
      this.$store.dispatch('dynamic/reloadMainData')
    }, 1000 * 60 * 2)

    this._runAfterPageChanged(() => {
      clearInterval(interVal)
    })
  },

  methods: {
    getSafe,

    pay(item) {
      this.shouldPay = item
      if (this.payMethod === 'pos')
        pos.send(item.balance, '/payment/' + item.id, (trace) => {
          this.addPayment({ trace }).then(() => {
            this._event('loading', false)
          })
        })
      else {
        this.addPayment({ trace: { rrn: 'pos' } }).then(() => {
          this._event('loading', false)
        })
      }
    },

    addPayment({ trace }) {
      return this.$axios
        .$post(`/payment`, {
          Payment: {
            paymentable_id: this.shouldPay.id,
            paymentable_type: this.shouldPay.paymentable,
            amount: this.shouldPay.balance,
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
  },
}
</script>
