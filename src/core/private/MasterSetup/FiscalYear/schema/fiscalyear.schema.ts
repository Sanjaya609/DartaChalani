import { IFiscalYearInitialValue } from './fiscalyear.interface'
import * as Yup from 'yup'

export const fiscalYearInitialValue: IFiscalYearInitialValue = {
  endDateAd: '',
  endDateBs: '',
  fiscalYearNameEn: '',
  fiscalYearNameNp: '',
  startDateAd: '',
  startDateBs: '',
}

export const fiscalYearValidationSchema = Yup.object({
  endDateAd: Yup.string().required('End Date (AD) is required'),
  endDateBs: Yup.string().required('End Date (BS) is required'),
  fiscalYearNameEn: Yup.string().required(
    'Fiscal Year Name (English) is required'
  ),
  fiscalYearNameNp: Yup.string().required(
    'Fiscal Year Name (Nepali) is required'
  ),
  startDateAd: Yup.string().required('Start Date (AD) is required'),
  startDateBs: Yup.string().required('Start Date (BS) is required'),
})
