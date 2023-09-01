import React from 'react'
import { FiscalYearData, ficalyearValidationSchema } from './schema';
import { useFormik } from 'formik';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../components/derived/utils';
import Button from '../../../../components/derived/Buttons/Buttons';
import { Box } from '../../../../components/core';
import { Input, Label } from '../../../../components/core/FormElement';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import NepaliDatePicker from '../../../../components/core/FormElement/NepaliDatePicker/NepaliDatePicker';
import { useFiscalYearPost } from './query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface FiscalYearFormProps {
    toggle: () => void;
    isOpen?: boolean;
    formData: FiscalYearData;
    // isEdit: boolean;
    // setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function FiscalyearForm(props: FiscalYearFormProps) {
    const { toggle, isOpen, formData } = props;
    const { mutate } = useFiscalYearPost()
    const { t } = useTranslation()
    const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema: ficalyearValidationSchema,
        onSubmit: (values: FiscalYearData) => {
            console.log(values)
            let payload = {
                ...values,
                isActive: true,
            }
            if (formData.id) {
                payload.id = formData.id
            }
            mutate(payload, {
                onSuccess: (res: any) => {
                    if (res.data?.status) {
                        toast.success(res.data.message)
                        resetForm()
                        toggle()
                    }
                }
            })

        }
    });
    return (
        <Modal
            toggle={() => {
                resetForm();
                toggle();
            }}
            isOpen={isOpen}>
            <ModalHeader
                toggle={() => {
                    resetForm();
                    toggle();
                }}>
                <p>{`${t('fiscalYear')} ${t('form')}`}</p>
            </ModalHeader>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <ModalBody>
                    <Box className="mb-2">
                        <Label htmlFor="fiscalYearNameEn">{`${t('fiscalYearName')} (${t('inEnglish')})`} * </Label>
                        <Input value={values.fiscalYearNameEn} onChange={handleChange} onBlur={handleBlur} name="fiscalYearNameEn" />
                        <FormikValidationError name="fiscalYearNameEn" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="fiscalYearNameNp">{`${t('fiscalYearName')} (${t('inNepali')})`} *</Label>
                        <Input value={values.fiscalYearNameNp} onChange={handleChange} onBlur={handleBlur} name="fiscalYearNameNp" />
                        <FormikValidationError name="fiscalYearNameNp" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="startDateBs">{t('startDate')} *</Label>
                        <NepaliDatePicker value={formData.startDateBs} handleChange={(date) => { setFieldValue('startDateBs', date) }} />
                        <FormikValidationError name="startDateBs" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="endDateBs">{t('endDate')} *</Label>
                        <NepaliDatePicker value={formData.endDateBs} handleChange={(date) => { setFieldValue('endDateBs', date) }} />
                        <FormikValidationError name="endDateBs" errors={errors} touched={touched} />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className={`btn  btn-success `}
                        type="submit"
                    >
                        {formData.id ? t('edit') : t('submit')}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default FiscalyearForm