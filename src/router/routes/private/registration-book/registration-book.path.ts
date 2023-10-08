const baseRoute = '/registration-book'

export const registrationBookRoutePath = {
  base: baseRoute,
  add: `${baseRoute}/add`,
  view: `${baseRoute}/view/:id`,
  edit: `${baseRoute}/edit/:id`,
}
