const baseRoute = '/standing-list'

export const standingListRoutePath = {
  base: baseRoute,
  add: `${baseRoute}/add`,
  edit:`${baseRoute}/edit/:id`,
  view:`${baseRoute}/view/:id`,
}
