const baseRoute = '/security'

export const securityRoutePath = {
  base: baseRoute,
  moduleSetup: `${baseRoute}/module-setup`,
  roleManagement: `${baseRoute}/role-management`,
  roleModuleMapping: `${baseRoute}/role-management/role-module-mapping/:roleData`,
  emailSetup: `${baseRoute}/email-setup`,
  userSetup: `${baseRoute}/user-setup`,
}
