import React from 'react'
import { RoleDataPayload, roelValidationSchema } from './schema';
import { useFormik } from 'formik';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../components/derived/utils';
import { Box } from '../../../../components/core';
import { Input, Label } from '../../../../components/core/FormElement';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import Button from '../../../../components/derived/Buttons/Buttons';
import { useRolePost } from './query';
import { UserType } from '../../../../schemas/apiActionSchema';
import StyledSelect from '../../../../components/StyledSelect/StyledSelect';
import { useTranslation } from 'react-i18next';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';

interface RoleFormProps {
    toggle: () => void;
    isOpen?: boolean;
    formData: RoleDataPayload;
    // isEdit: boolean;
    // setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function RoleForm(props: RoleFormProps) {
    const { toggle, isOpen, formData } = props;
    const { mutate } = useRolePost()
    const { t } = useTranslation()
    const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema: roelValidationSchema,
        onSubmit: (values: RoleDataPayload) => {
            console.log(values)
            let payload = {
                ...values,
                isActive: true,
                roleType: String(values.roleType?.value)
            }
            if (formData.id) {
                payload.id = formData.id
                payload.isActive = formData.isActive
            }
            mutate(payload, {
                onSuccess: (res: any) => {
                    if (res.data.status) {
                        toastNotify.success(res.data.message)
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
                <p>{t('roleSetup')} {t('form')}</p>
            </ModalHeader>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                <ModalBody>

                    <Box className="mb-2">
                        <Label htmlFor="name">{`${t('roleName')} (${t('inEnglish')})`} {"*"}</Label>
                        <Input value={values.roleNameEnglish} onChange={handleChange} onBlur={handleBlur} name="roleNameEnglish" />
                        <FormikValidationError name="roleNameEnglish" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="roleNameNepali">{`${t('roleName')} (${t('inNepali')})`} {"*"}</Label>
                        <Input value={values.roleNameNepali} onChange={handleChange} onBlur={handleBlur} name="roleNameNepali" />
                        <FormikValidationError name="roleNameNepali" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="">{t('roleType')} {"*"}</Label>
                        <StyledSelect
                            options={Object.values(UserType).map(ek => ({ label: ek, value: ek }))}
                            name="roleType"
                            value={values.roleType}
                            onChange={(e) => {
                                setFieldValue('roleType', e.value);
                            }}
                            onBlur={handleBlur}
                        />
                        <FormikValidationError name="roleType" errors={errors} touched={touched} />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="description">{t('description')}</Label>
                        <Input value={values.description} onChange={handleChange} onBlur={handleBlur} name="description" />
                        <FormikValidationError name="description" errors={errors} touched={touched} />
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

export default RoleForm