export default function (context) {
  const pers = context.$auth.user.user_level?.permission_do
    ? context.$auth.user.user_level.permission_do
    : []
  context.$gates.setPermissions(pers)

  if (Object.entries(context.route.params).length !== 0) {
    return
  }

  let permission = context.route.name.split('___fa')[0]
  if (permission.endsWith('-')) {
    permission = permission.slice(0, -1)
  }

  if (permission.startsWith('-')) {
    permission = permission.slice(1)
  }

  // if (context.route.name === 'admin-dashboard') return

  if (context.$gates.hasPermission(permission + '.show')) {
    return
  }
  if (context.route.name === 'admin-user-pass-change') {
    return
  }
  return context.redirect({
    name: context.$auth.user.user_level.permission_do[0].split('.')[0],
  })
}
