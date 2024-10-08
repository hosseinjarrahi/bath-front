import { formatNumber } from '~/helpers/invoiceHelpers'

export default function (val) {
  return [
    {
      title: 'نام راننده',
      field: 'passenger',
      sendKey: 'passenger_id',
      type: 'select',
      rel: {
        model: 'Passenger',
      },
      props: {
        'item-text': 'full_name',
        'item-value': 'id',
      },
      isHeader: true,
      rules: ['required'],
      col: { md: 12 },
    },
    {
      title: 'سرویس',
      field: 'active_service_items',
      type: 'text',
      showIn: ['show'],
      isHeader: true,
      rules: ['required'],
      inList(item, form) {
        return item.map((i) => i?.service?.name + ':::' + i?.number).join(' - ')
      },
      col: { md: 6 },
    },
    {
      title: 'تاریخ تسویه',
      field: 'checkout_date',
      type: 'date',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
      props: {
        format: 'YYYY-MM-DD HH:mm',
        type: 'datetime',
      },
      inList(date) {
        if (date) return new Date(date).toLocaleString('fa-IR')
      },
    },
    {
      title: 'تاریخ ثبت',
      field: 'start_date',
      type: 'date',
      isHeader: true,
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetime',
      },
      inList(date) {
        return new Date(date).toLocaleString('fa-IR')
      },
    },
    {
      title: 'تاریخ پایان',
      field: 'end_date',
      type: 'date',
      isHeader: true,
      props: {
        format: 'YYYY-MM-DD HH:mm:ss',
        type: 'datetime',
      },
      inList(date) {
        return new Date(date).toLocaleString('fa-IR')
      },
    },
    {
      title: 'مبلغ کل',
      field: 'price',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      props: {
        type: 'number',
      },
      inList(amount) {
        return formatNumber(amount)
      },
      col: { md: 6 },
    },
    {
      title: 'مبلغ پرداخت شده',
      field: 'payed',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      props: {
        type: 'number',
      },
      inList(payed) {
        return formatNumber(+payed)
      },
      col: { md: 6 },
    },
    {
      title: 'جزییات مبلغ',
      field: 'price_details',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      inList(_, form) {
        const wrapper = (data) =>
          '<span class="pa-1 rounded caption primary">' + data + '</span>'

        const serviceItemsPrice =
          'مبلغ حمام: ' + formatNumber(form.service_price)
        const optionsPrice = 'مبلغ آپشن ها: ' + formatNumber(form.options_price)
        const delayPrice = 'مبلغ تاخیر: ' + formatNumber(form.delay_price)
        const damage = 'مبلغ خسارت: ' + formatNumber(form.damage)

        return [serviceItemsPrice, optionsPrice, delayPrice, damage]
          .map((i) => wrapper(i))
          .join('<br>')
      },
      col: { md: 6 },
    },
    {
      title: 'آپشن ها',
      field: 'service_options',
      type: 'text',
      isHeader: true,
      inList(options) {
        return options
          ?.map(
            (i) =>
              '<div class="rounded pa-1 primary ma-1">' +
              i.title +
              ' | ' +
              i.pivot.count +
              '</div>'
          )
          .join('')
      },
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'زمان سپری شده',
      field: 'past_time',
      type: 'text',
      isHeader: true,
      inList(time) {
        return time.replace('پس از', '').replace('پیش از', '')
      },
    },
    {
      title: 'زمان باقی مانده',
      field: 'remained_time',
      type: 'text',
      isHeader: true,
      inList(remainedMinutes) {
        if (!remainedMinutes.includes('دیگر')) {
          return `<span class="px-4 py-1 white--text rounded-lg error">${remainedMinutes
            .replace('پس از', '')
            .replace('پیش از', '')}</span>`
        } else {
          return `<span class="px-4 py-1 white--text rounded-lg info">${remainedMinutes
            .replace('پس از', '')
            .replace('پیش از', '')}</span>`
        }
      },
    },
  ]
}
