const baseRoute = '/recommendation/:dynamicModule'
const formModulesRoute = `${baseRoute}/:moduleName`

export const dynamicFormRoutePath = {
  base: baseRoute,
  formModules: formModulesRoute,
  add: `${formModulesRoute}/add`,
  edit: `${formModulesRoute}/edit/:id`,
  view: `${formModulesRoute}/view/:id`,
}
