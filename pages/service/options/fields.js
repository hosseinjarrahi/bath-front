export default function (val) {
  return [
    {
      title: 'عنوان',
      field: 'title',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'قیمت',
      field: 'price',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      props: {
        type: 'number'
      },
      col: { md: 6 },
    },
    {
      title: 'تعداد',
      field: 'count',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'پیشفرض',
      field: 'is_default',
      type: 'switcher',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
  ]
}
