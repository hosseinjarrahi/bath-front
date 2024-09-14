export default function (val) {
  return [
    {
      title: 'نام سرویس',
      field: 'name',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'تعداد حمام ها',
      field: 'capacity',
      type: 'text',
      isHeader: true,
      props: {
        type: 'number',
      },
      rules: ['required'],
      col: { md: 6 },
    },
  ]
}
