import documentTypeAPI from '@/core/private/MasterSetup/DocumentType/services/document-type.api'
import fiscalYearAPI from '@/core/private/MasterSetup/FiscalYear/services/fiscalyear.api'
import officeAPI from '@/core/private/MasterSetup/Office/services/office.api'
import sectorAPI from '@/core/private/MasterSetup/Sector/services/sector.api'
import serviceTypeAPI from '@/core/private/MasterSetup/ServiceType/services/servicetype.api'
import locationAPI from '@/core/private/MasterSetup/Location/services/location.api'
import moduleDocumentMappingAPI from '../ModuleDocumentMapping/services/module-document-mapping.api'

export const masterAPIs = {
  ...fiscalYearAPI,
  ...sectorAPI,
  ...serviceTypeAPI,
  ...documentTypeAPI,
  ...officeAPI,
  ...locationAPI,
  ...moduleDocumentMappingAPI,
}
