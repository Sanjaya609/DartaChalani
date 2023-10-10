import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import * as Yup from 'yup'
import { IStandingListInitialValue } from './standing-list.interface'

export const addStandingListInitialValues: IStandingListInitialValue = {
  applicationDate: ADToBS(new Date()),
  address: '',
  contactNumber: '',
  contactPersonName: '',
  firmRegistrationNumber: '',
  localBodyId: '',
  letter_no: '',
  panOrVatNumber: '',
  serviceTypeId: '',
  panOrVatRegistrationDate: '',
  wardNumber: '',
  provinceId: '',
  districtId: '',
  personOrFirmName: '',
  registrationDate: '',
  taxClearanceDate: '',
  taxClearanceDateExtendedDate: '',
  workingSectorDetails: '',
}

export const addStandingListValidationSchema = Yup.object({
  address: Yup.string().required('registrationBook.errors.address'),
  contactNumber: Yup.string().required('registrationBook.errors.contactNumber'),
  contactPersonName: Yup.string().required(
    'registrationBook.errors.contactPersonName'
  ),
  firmRegistrationNumber: Yup.string().required(
    'registrationBook.errors.firmRegistrationNumber'
  ),
  letter_no: Yup.string().required('registrationBook.errors.letter_no'),
  localBodyId: Yup.string().required('registrationBook.errors.localBodyId'),
  provinceId: Yup.string().required('registrationBook.errors.provinceId'),
  districtId: Yup.string().required('registrationBook.errors.districtId'),
  serviceTypeId: Yup.string().required('registrationBook.errors.serviceTypeId'),
  panOrVatNumber: Yup.string().required(
    'registrationBook.errors.panOrVatNumber'
  ),
  panOrVatRegistrationDate: Yup.string().required(
    'registrationBook.errors.panOrVatRegistrationDate'
  ),
  personOrFirmName: Yup.string().required(
    'registrationBook.errors.personOrFirmName'
  ),
  registrationDate: Yup.string().required(
    'registrationBook.errors.registrationDate'
  ),
  wardNumber: Yup.string().required('registrationBook.errors.wardNumber'),
  taxClearanceDate: Yup.string().required(
    'registrationBook.errors.taxClearanceDate'
  ),
  taxClearanceDateExtendedDate: Yup.string().required(
    'registrationBook.errors.taxClearanceDateExtendedDate'
  ),
})
