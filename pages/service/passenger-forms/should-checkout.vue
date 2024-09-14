<template>
  <DynamicTemplate>
    <template #actions="item">
      <v-btn v-if="getSafe(item, 'balance', 0) > 0" small text @click="pay(item)">
        <v-icon small left>fal fa-money-bill</v-icon>
        <span>پرداخت</span>
      </v-btn>
      <v-btn v-else :disabled="!getSafe(item, 'passenger.has_residence')" small text
        @click="_event('checkout.dialog', item)">
        <v-icon small left>fal fa-check</v-icon>
        <span>تسویه</span>
      </v-btn>
    </template>

    <template #extra>
      <CheckoutDialog />
    </template>
  </DynamicTemplate>
</template>

<script>
import pos from '~/helpers/pos'
import fields from "./fields";
import { DynamicTemplate } from "majra";
import { get as getSafe } from 'lodash';
import { connector } from '~/helpers/osConnector'
import AcceptanceForm from "@/components/service/AcceptanceForm";
import CheckoutDialog from "@/components/service/CheckoutDialog";

export default {
  components: { DynamicTemplate, AcceptanceForm, CheckoutDialog },

  layout: "dashboard",

  data() {
    return {
      shouldPay: {}
    }
  },

  beforeCreate() {
    this.$majra.init({
      hiddenActions: ["create"],
      mainRoute: { route: "/service/should-checkout?_with=serviceOptions", key: 'PassengerForm' },
      relations: [
        { route: "/passenger?_select=id,name,family,code_meli", key: "Passenger" },
      ],
      fields: fields(this),
    });
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

  methods: {
    getSafe,

    pay(item) {
      this.shouldPay = item
      pos.send(
        item.balance,
        '/payment/' + item.id,
        (trace) => {
          this.addPayment({ trace }).then(() => {
            this._event('loading', false)
          })
        }
      )
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
  }
};
</script>
