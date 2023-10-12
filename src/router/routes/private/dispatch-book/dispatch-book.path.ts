const baseRoute = '/dispatch-book'

export const dispatchBookRoutePath = {
  base: baseRoute,
  add: `${baseRoute}/add`,
  edit: `${baseRoute}/edit/:id`,
  view: `${baseRoute}/view/:id`,
}
