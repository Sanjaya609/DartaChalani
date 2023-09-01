import React, { Dispatch, SetStateAction, useState } from 'react'
import { Box } from '../../core'
import Button from '../../derived/Buttons/Buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../derived/utils'
import { Input, Label } from '../../core/FormElement'
import FormikValidationError from '../../FormikValidationError/FormikValidationError'
import { useFormik } from 'formik'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { UpdatePasswordFormInitialValues, UpdatePasswordFormSchema, UpdatePasswordFormValidation, UpdatePasswordPayload } from './updatePassword.schema'
import { useUpdatePassword } from './UpdatePasswordQuery'
import { Spinner } from 'reactstrap'
import { toastNotify } from '../../ToastNotifier/ToastNotifier'
import { useAuth } from '../../../providers/ApplicationProvider'
import { useNavigate } from 'react-router-dom'
import { publicRoutePath } from '../../../routes/public/publicRoutePath'
import { useTranslation } from 'react-i18next'

interface UpdatePasswordModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

function UpdatePasswordModal({ isOpen, setIsOpen }: UpdatePasswordModalProps) {
    const { t } = useTranslation();
    const toggle = () => setIsOpen(!isOpen)
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [currentPasswordType, setCurrentPasswordType] = useState<boolean>(true);
    const [isTypePassword, setIsTypePassword] = useState<boolean>(true)
    const [isTypePassword1, setIsTypePassword1] = useState<boolean>(true)
    const [formInitialValues, setFormInitialValues] = useState<UpdatePasswordFormSchema>(UpdatePasswordFormInitialValues)
    const toggleInputType = () => setIsTypePassword(!isTypePassword);
    const toggleInputType1 = () => setIsTypePassword1(!isTypePassword1);
    const toggleCurrentPasswordType = () => setCurrentPasswordType(!currentPasswordType);


    const { mutateAsync: updatePassword, isLoading } = useUpdatePassword();

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        resetForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: formInitialValues,
        validationSchema: UpdatePasswordFormValidation,
        onSubmit: (values: UpdatePasswordFormSchema) => {
            const payload: UpdatePasswordPayload = {
                confirmNewPassword: values?.confirmNewPassword,
                currentPassword: values?.currentPassword,
                newPassword: values?.newPassword,
                token: localStorage.getItem("token") ?? "",
            }
            updatePassword(payload, {
                onSuccess: (res: any) => {
                    if (res.data.status) {
                        setIsAuthenticated(false);
                        localStorage.clear();
                        navigate(publicRoutePath.login);
                        resetForm();
                        toggle();
                        setFormInitialValues(UpdatePasswordFormInitialValues);
                        toastNotify.success(res.data.message);
                    }
                }
            });
        },
    });
    return (
        <Modal centered toggle={toggle} isOpen={isOpen} >
            <ModalHeader
                toggle={() => {
                    toggle();
                }}
            >
                <p>{t('updatePassword.updatePassword')}</p>
            </ModalHeader>
            <form
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <ModalBody>
                    <Box className="mb-2">
                        <Label htmlFor="currentPassword">
                            {t('updatePassword.currentPassword')}
                        </Label>
                        <Input
                            type={`${currentPasswordType ? "password" : "text"}`}
                            value={values.currentPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="currentPassword"
                            rightIcon={isTypePassword ? <AiFillEyeInvisible onClick={toggleCurrentPasswordType} /> : <AiFillEye onClick={toggleCurrentPasswordType} />}
                        />
                        <FormikValidationError
                            name="currentPassword"
                            errors={errors}
                            touched={touched}
                        />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="newPassword">
                            {t('updatePassword.newPassword')}

                        </Label>
                        <Input
                            type={`${isTypePassword ? "password" : "text"}`}
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="newPassword"
                            rightIcon={isTypePassword ? <AiFillEyeInvisible onClick={toggleInputType} /> : <AiFillEye onClick={toggleInputType} />}
                        />
                        <FormikValidationError
                            name="newPassword"
                            errors={errors}
                            touched={touched}
                        />
                    </Box>
                    <Box className="mb-2">
                        <Label htmlFor="confirmNewPassword">
                            {t('updatePassword.confirmPassword')}
                        </Label>
                        <Input
                            type={`${isTypePassword1 ? "password" : "text"}`}
                            value={values.confirmNewPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirmNewPassword"
                            rightIcon={isTypePassword ? <AiFillEyeInvisible onClick={toggleInputType1} /> : <AiFillEye onClick={toggleInputType1} />}
                        />
                        <FormikValidationError
                            name="confirmNewPassword"
                            errors={errors}
                            touched={touched}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="btn btn-danger"
                        type="reset"
                        onClick={() => {
                            resetForm();
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        className={`btn  btn-success `}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spinner size="sm" /> : " Change Password"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default UpdatePasswordModal