import passengerFields from './../passengers/fields'

export default function (val) {
  return [
    {
      title: 'حمام',
      field: 'services.id',
      type: 'has',
      rel: {
        model: 'Service',
        throw: 'serviceItem.service',
      },
      isHeader: true,
      rules: ['required'],
      showIn: [],
      inList(_, form) {
        const item = form.beds

        if (!item) {
          return '...'
        }

        return item.map(i => {
          return '<div class="rounded primary px-2 py-1 white--text d-inline-block">' +
            i?.bed_room?.name +
            ' ::: ' +
            i?.number +
            '</div>'
        }).join(' ')
      },
      props: {
        'item-text': 'name',
        'item-value': 'id',
      },
      col: { md: 6 },
    },
    ...passengerFields(val)
  ]
}
