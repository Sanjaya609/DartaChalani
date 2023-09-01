import * as yup from 'yup';

export interface FiscalYearData {
    endDateBs: string,
    fiscalYearNameEn: string,
    fiscalYearNameNp: string,
    id?: number,
    startDateBs: string
}

export interface FiscalYearResponse {
    endDateBs: string,
    fiscalYearNameEn: string,
    fiscalYearNameNp: string,
    id?: number,
    startDateBs: string,
    isActive: boolean,
    isCurrentFiscalYear: boolean
}

export const fiscayearIntialValue = {
    endDateBs: '',
    fiscalYearNameEn: '',
    fiscalYearNameNp: '',
    startDateBs: ''
}

export const ficalyearValidationSchema = yup.object({
    endDateBs: yup.string().required("fiscalYearValidation.endDate"),
    fiscalYearNameEn: yup.string().required("fiscalYearValidation.fiscalYearEn"),
    fiscalYearNameNp: yup.string().required("fiscalYearValidation.fiscalYearNp"),
    startDateBs: yup.string().required("fiscalYearValidation.startDate")
})

