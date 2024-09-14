export default [
  {
    link: true,
    to: '/admin/dashboard',
    text: 'داشبورد',
    icon: 'tachometer-alt-slowest',
  },

  {
    text: 'افراد',
    icon: 'fal fa-users-gear',
    link: false,
    isGroup: true,
    children: [
      {
        link: true,
        to: '/admin/users',
        text: 'کاربران',
        icon: 'users',
      },
      {
        link: true,
        to: '/admin/user-level-permission',
        text: 'نقش کاربران',
        icon: 'user-tag',
      },
      {
        link: true,
        to: '/admin/user-pass-change',
        text: 'تغییر رمز',
        icon: 'key',
      },
    ],
  },

  {
    text: 'حمام',
    icon: 'fal fa-bath',
    link: false,
    isGroup: true,
    children: [
      {
        link: true,
        to: '/service/dashboard',
        text: 'مدیریت',
        icon: 'building',
      },
      {
        link: true,
        to: '/service/service',
        text: 'سرویس ها',
        icon: 'bath',
      },
      {
        link: true,
        to: '/service/service-items',
        text: 'حمام ها',
        icon: 'shower',
      },
      {
        link: true,
        to: '/service/passengers',
        text: 'رانندگان',
        icon: 'truck-container',
      },
      {
        link: true,
        to: '/service/passenger-forms/new',
        text: 'فرم های پذیرش',
        icon: 'sticky-note',
      },
      {
        link: true,
        to: '/service/passenger-forms/should-checkout',
        text: 'تسویه نشده ها',
        icon: 'times',
      },
      {
        link: true,
        to: '/service/passenger-forms/archive',
        text: 'فرم های پذیرش آرشیو',
        icon: 'archive',
      },
      {
        link: true,
        to: '/service/options',
        text: 'آپشن ها',
        icon: 'toilet-paper',
      },
      {
        link: true,
        to: '/service/report',
        text: 'گزارش',
        icon: 'analytics',
      },
      {
        link: true,
        to: '/service/settings',
        text: 'تنظیمات',
        icon: 'gear',
      },
    ],
  },
]
