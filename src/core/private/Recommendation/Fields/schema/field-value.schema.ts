import * as Yup from 'yup'
import { IAddFieldValueInitialValue } from './filed-value.interface'


export const addFieldInitialValues: IAddFieldValueInitialValue =
    {
        fieldValueListRequestList: [],
        formId: 0,
        formValueId: 0
    }


export const addFieldValidationSchema = Yup.object({
       
})
