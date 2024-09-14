import validations from '~/helpers/validations'

export default function (val) {
  return [
    {
      title: 'نام',
      field: 'name',
      type: 'text',
      isHeader: true,
      rules: ['required'],
      col: { md: 6 },
      props: {
        rules: [validations.required()],
      },
    },

    {
      title: 'کد ملی',
      field: 'code_meli',
      type: 'text',
      rules: ['required'],
      col: { md: 6 },
      props: {
        rules: [validations.required()],
      },
    },
  ]
}
