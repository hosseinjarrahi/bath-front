<template>
  <div class="d-flex flex-row flex-wrap justify-center">
    <div class="col-12 col-md-3">
      <CardWidget title="پر استفاده ترین تخت ها">
        <v-chip v-for="(service, index) in getSafe(report, 'beds', [])" :key="index" class="ma-1">
          {{
            'اتاق: ' +
            getSafe(service, 'service.bed_room.name') +
            ' ::: ' +
            'تخت: ' +
            getSafe(service, 'service.number') +
            ' ::: ' +
            'تعداد رزرو:' +
            getSafe(service, 'count')
          }}
        </v-chip>
      </CardWidget>
    </div>
    <div class="col-12 col-md-3">
      <CardWidget title="کم استفاده ترین تخت ها">
        <v-chip v-for="(service, index) in getSafe(report, 'low_beds', [])" :key="index" class="ma-1">
          {{
            'اتاق: ' +
            getSafe(service, 'service.bed_room.name') +
            ' ::: ' +
            'تخت: ' +
            getSafe(service, 'service.number') +
            ' ::: ' +
            'تعداد رزرو:' +
            getSafe(service, 'count')
          }}
        </v-chip>
      </CardWidget>
    </div>
    <div class="col-12 col-md-3">
      <CardWidget title="بیشترین رزرو ها">
        <v-chip v-for="(passenger, index) in getSafe(report, 'passengers', [])" :key="index" class="ma-1">
          <v-img :src="getSafe(passenger, 'passenger.img', '/avatar.png') || '/avatar.png'" width="30px" height="30px"
            class="border-circle ml-2" cover />
          {{
            getSafe(passenger, 'passenger.full_name') +
            ' ::: ' +
            'تعداد رزرو:' +
            getSafe(passenger, 'count')
          }}
        </v-chip>
      </CardWidget>
    </div>
    <div class="col-12 col-md-3">
      <CardWidget title="گزارش مالی">
        <v-chip class="ma-1">
          <span>درآمد ماهانه: </span>
          <span class="px-1">
            {{
              formatNumber(getSafe(report, 'payments.montht_payments'))
            }}
          </span>
        </v-chip>
        <v-chip class="ma-1">
          <span>درآمد هفتگی: </span>
          <span class="px-1">
            {{
              formatNumber(getSafe(report, 'payments.week_payments'))
            }}
          </span>
        </v-chip>
        <v-chip class="ma-1">
          <span>ماینگین درآمد روزانه: </span>
          <span class="px-1">
            {{
              formatNumber(getSafe(report, 'payments.day_payments'))
            }}
          </span>
        </v-chip>
      </CardWidget>
    </div>
  </div>
</template>

<script>
import { get as getSafe } from 'lodash'
import CardWidget from '@/components/widgets/CardWidget'
import { formatNumber } from "~/helpers/invoiceHelpers";

export default {
  layout: 'dashboard',

  components: { CardWidget },

  data() {
    return {
      report: {}
    }
  },

  created() {
    this.getReport()
  },

  methods: {
    getSafe,
    formatNumber,
    getReport() {
      this._event('loading')
      this.$axios.$get('/service/report')
        .then(res => {
          this.report = res
        })
        .finally(() => {
          this._event('loading', false)
        })
    }
  }
}
</script>
