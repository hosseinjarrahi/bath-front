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
      title: 'کلید',
      field: 'key',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
    {
      title: 'مقدار',
      field: 'value',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
    },
  ]
}
