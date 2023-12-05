import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import * as Yup from 'yup'
import { IAddRegistrationBookInitialValue } from './add-registration-book.interface'

export const addRegistrationBookInitialValues: IAddRegistrationBookInitialValue =
  {
    letterDispatchDate: '',
    letterDispatchNumber: '',
    letterLinks: '',
    letterSenderName: '',
    letterToPerson: '',
    localBodyId: '',
    physicalAddress: '',
    remarks: '',
    sectorId: '',
    subjectOfLetter: '',
    wardNumber: '',
    provinceId: '',
    districtId: '',
  }

export const addRegistrationBookValidationSchema = Yup.object({
  letterDispatchDate: Yup.string().required(
    'registrationBook.errors.letterDispatchDate'
  ),
  letterDispatchNumber: Yup.string().required(
    'registrationBook.errors.letterDispatchNumber'
  ),
  letterSenderName: Yup.string().required(
    'registrationBook.errors.letterSenderName'
  ),
  localBodyId: Yup.string().required('registrationBook.errors.localBodyId'),
  provinceId: Yup.string().required('registrationBook.errors.provinceId'),
  districtId: Yup.string().required('registrationBook.errors.districtId'),
  subjectOfLetter: Yup.string().required(
    'registrationBook.errors.subjectOfLetter'
  ),
})
