import formatDate from '@/utility/date/dateFunction'
import * as Yup from 'yup'

export const addRegistrationBookInitialValues = {
  applicationDate: new Date(),
  letterDispatchDate: '',
  letterDispatchNumber: '',
  letterLinks: '',
  letterSenderName: '',
  letterToPerson: '',
  localBodyId: '',
  physicalAddress: '',
  registrationNumber: '',
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
  sectorId: Yup.string().required('registrationBook.errors.sectorId'),
  subjectOfLetter: Yup.string().required(
    'registrationBook.errors.subjectOfLetter'
  ),
  wardNumber: Yup.string().required('registrationBook.errors.wardNumber'),
})
