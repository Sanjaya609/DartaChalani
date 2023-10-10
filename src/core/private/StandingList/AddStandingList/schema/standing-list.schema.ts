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
  address: Yup.string().required('standingList.errors.address'),
  contactNumber: Yup.string().required('standingList.errors.contactNumber'),
  contactPersonName: Yup.string().required(
    'standingList.errors.contactPersonName'
  ),
  firmRegistrationNumber: Yup.string().required(
    'standingList.errors.firmRegistrationNumber'
  ),
  letter_no: Yup.string().required('standingList.errors.letter_no'),
  localBodyId: Yup.string().required('standingList.errors.localBodyId'),
  provinceId: Yup.string().required('standingList.errors.provinceId'),
  districtId: Yup.string().required('standingList.errors.districtId'),
  serviceTypeId: Yup.string().required('standingList.errors.serviceTypeId'),
  panOrVatNumber: Yup.string().required('standingList.errors.panOrVatNumber'),
  panOrVatRegistrationDate: Yup.string().required(
    'standingList.errors.panOrVatRegistrationDate'
  ),
  personOrFirmName: Yup.string().required(
    'standingList.errors.personOrFirmName'
  ),
  registrationDate: Yup.string().required(
    'standingList.errors.registrationDate'
  ),
  wardNumber: Yup.string().required('standingList.errors.wardNumber'),
  taxClearanceDate: Yup.string().required(
    'standingList.errors.taxClearanceDate'
  ),
  taxClearanceDateExtendedDate: Yup.string().required(
    'standingList.errors.taxClearanceDateExtendedDate'
  ),
})
