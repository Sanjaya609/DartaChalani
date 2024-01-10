const baseRoute = '/recommendation/:dynamicModule'

export const dynamicFormRoutePath = {
  base: baseRoute,
  add: `${baseRoute}/add`,
  edit: `${baseRoute}/edit/:id`,
  view: `${baseRoute}/view/:id`,
}
