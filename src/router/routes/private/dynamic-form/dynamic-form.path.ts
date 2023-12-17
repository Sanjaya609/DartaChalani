const baseRoute = '/dynamic-form'

export const dynamicFormRoutePath = {
  base: baseRoute,
  add: `${baseRoute}/add`,
  edit: `${baseRoute}/edit/:id`,
  view: `${baseRoute}/view/:id`,
}
