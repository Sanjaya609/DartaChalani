const baseRoute = '/master-setup'

export const masterSetupRoutePath = {
  base: baseRoute,
  fiscalYear: `${baseRoute}/fiscalyear`,
  sector: `${baseRoute}/sector`,
  serviceType: `${baseRoute}/service-type`,
  documentType: `${baseRoute}/document-type`,
  office: `${baseRoute}/office`,
  moduleDocumentMapping: `${baseRoute}/document-module-mapping`,
  dropdownConfig: {
    base: `${baseRoute}/drop-down-config`,
    add: `${baseRoute}/drop-down-config/add`,
    edit: `${baseRoute}/drop-down-config/edit/:id`,
  },
}
