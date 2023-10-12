import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import * as Yup from 'yup'
import { IAddDispatchBookInitialValue } from './add-dispatch-book.interface'

export const addDispatchBookInitialValues: IAddDispatchBookInitialValue = {
  letterNumber: '',
  dispatchNumber: '',
  letterDate: '',
  subjectOfLetter: '',
  letterReceiverName: '',
  letterReceiverEmail: '',
  letterReceiverAddress: '',
  letterCarrierName: '',
  letterCarrierContact: '',
  letterToSection: '',
  physicalFileLocation: '',
  remarks: '',
  localBodyId: '',
  wardNumber: '',
  provinceId: '',
  districtId: '',
}

export const addDispatchBookValidationSchema = Yup.object({
  letterNumber: Yup.string().required('dispatchBook.errors.letterNumber'),
  dispatchNumber: Yup.string().required('dispatchBook.errors.dispatchNumber'),
  letterDate: Yup.string().required('dispatchBook.errors.letterDate'),
  subjectOfLetter: Yup.string().required('dispatchBook.errors.subjectOfLetter'),
  letterReceiverName: Yup.string().required(
    'dispatchBook.errors.letterReceiverName'
  ),
  letterReceiverEmail: Yup.string()
    .required('dispatchBook.errors.letterReceiverEmail')
    .email('yup.invalid-email'),
  letterReceiverAddress: Yup.string().required(
    'dispatchBook.errors.letterReceiverAddress'
  ),
  letterCarrierName: Yup.string().required(
    'dispatchBook.errors.letterCarrierName'
  ),
  letterCarrierContact: Yup.string().required(
    'dispatchBook.errors.letterCarrierContact'
  ),
  letterToSection: Yup.string().required('dispatchBook.errors.letterToSection'),
  physicalFileLocation: Yup.string().required(
    'dispatchBook.errors.physicalFileLocation'
  ),
  remarks: Yup.string().required('dispatchBook.errors.remarks'),
  localBodyId: Yup.string().required('dispatchBook.errors.localBodyId'),
  wardNumber: Yup.string().required('dispatchBook.errors.wardNumber'),
  provinceId: Yup.string().required('dispatchBook.errors.provinceId'),
  districtId: Yup.string().required('dispatchBook.errors.districtId'),
})
