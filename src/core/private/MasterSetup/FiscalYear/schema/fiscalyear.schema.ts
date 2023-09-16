import * as Yup from 'yup'
import { IFiscalYearInitialValue } from './fiscalyear.interface'

export const fiscalYearInitialValue: IFiscalYearInitialValue = {
  endDateAd: '',
  endDateBs: '',
  fiscalYearNameEn: '',
  fiscalYearNameNp: '',
  startDateAd: '',
  startDateBs: '',
}

export const fiscalYearValidationSchema = Yup.object({
  endDateAd: Yup.string().required('masterSetup.fiscalYear.errors.endDateAd'),
  endDateBs: Yup.string().required('masterSetup.fiscalYear.errors.endDateBs'),
  fiscalYearNameEn: Yup.string().required(
    'masterSetup.fiscalYear.errors.fiscalYearNameEn'
  ),
  fiscalYearNameNp: Yup.string().required(
    'masterSetup.fiscalYear.errors.fiscalYearNameNp'
  ),
  startDateAd: Yup.string().required(
    'masterSetup.fiscalYear.errors.startDateAd'
  ),
  startDateBs: Yup.string().required(
    'masterSetup.fiscalYear.errors.startDateBs'
  ),
})
