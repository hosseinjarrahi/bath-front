export default function (val) {
  return [
    {
      title: 'نام حمام',
      field: 'service',
      sendKey: 'service_id',
      type: 'select',
      rel: {
        model: 'Service',
      },
      props: {
        'item-text': 'name',
        'item-value': 'id',
      },
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'شماره حمام',
      field: 'number',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      props: {
        type: 'number',
      },
      col: { md: 6 },
    },
    {
      title: 'وضعیت حمام',
      field: 'status',
      type: 'select',
      rel: false,
      values: [
        { text: 'سالم', value: 'healthy' },
        { text: 'خراب', value: 'broken' },
      ],
      isHeader: true,
      rules: ['required'],
      col: { md: 12 },
    },
  ]
}
