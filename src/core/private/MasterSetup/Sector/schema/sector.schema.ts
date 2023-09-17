import * as Yup from 'yup'
import { ISectorInitialValue } from './sector.interface'

export const sectorInitialValue: ISectorInitialValue = {
  orderNumber: '',
  sectorNameEnglish: '',
  sectorNameNepali: '',
}

export const sectorValidationSchema = Yup.object({
  orderNumber: Yup.string().required('masterSetup.sector.errors.orderNumber'),
  sectorNameEnglish: Yup.string().required(
    'masterSetup.sector.errors.sectorNameEnglish'
  ),
  sectorNameNepali: Yup.string().required(
    'masterSetup.sector.errors.sectorNameNepali'
  ),
})
