import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import NepalGovLogo from "../../../../assets/image/nepal-gov.png";
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import { useUpdatePassword } from '../../../../components/Header/UpdatePassword/UpdatePasswordQuery';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { Box, FlexBox, Image, Text } from '../../../../components/core';
import { Input, Label } from '../../../../components/core/FormElement';
import Button from '../../../../components/derived/Buttons/Buttons';
import { switchLanguage } from '../../../../i18/i18';
import { useAuth } from '../../../../providers/ApplicationProvider';
import { publicRoutePath } from '../../../../routes/public/publicRoutePath';
import { UpdateFirstPasswordFormSchema, UpdateFirstPasswordInitialValues, UpdateFirstPasswordValidationSchema } from './UpdatePassword.schema';

const UpdatePassword = () => {
    const { mutateAsync: updateFirstPassword, isLoading } = useUpdatePassword();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [initialValues, setInitialValues] = useState(UpdateFirstPasswordInitialValues);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const [isTypePassword1, setIsTypePassword1] = useState(true);
    const [isTypePassword2, setIsTypePassword2] = useState(true);
    const toggleInputType = () => {
        setIsTypePassword(!isTypePassword)
    }
    const toggleInputType1 = () => {
        setIsTypePassword1(!isTypePassword1)
    }
    const toggleInputType2 = () => {
        setIsTypePassword2(!isTypePassword2)
    }
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        handleBlur,
        resetForm,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: UpdateFirstPasswordValidationSchema,
        onSubmit: (values: UpdateFirstPasswordFormSchema) => {
            const payload = {
                confirmNewPassword: values?.confirmNewPassword,
                currentPassword: values?.currentPassword,
                newPassword: values?.newPassword,
                token: localStorage?.getItem('firstLoginToken')
            }
            updateFirstPassword(payload, {
                onSuccess: (res: any) => {
                    if (res.data.status) {
                        setIsAuthenticated(false);
                        localStorage.clear();
                        navigate(publicRoutePath.login);
                        resetForm();
                        setInitialValues(UpdateFirstPasswordInitialValues);
                        toastNotify.success(res.data.message);
                    }
                }
            })
        },
    });
    return (
        <FlexBox
            align="center"
            justify="center"
            className="w-100 h-100 login-container"
        >
            <Box className="row d-flex justify-content-center align-items-center">
                <Box className="col-sm-9 col-md-9 col-lg-9 mt-5">
                    <FlexBox align="center" justify="space-between">
                        <FlexBox align="center">
                            <Image src={NepalGovLogo} alt="nepal gov logo" />
                            <Box className="mx-4">
                                <Text variant="h6">{t("projectName")}</Text>
                                <Text variant="h6">
                                    {t("localGovernment")}
                                </Text>
                            </Box>
                        </FlexBox>
                        <Box className="my-3 my-md-0 ml-1 d-flex">
                            <Box component="span" className="cursor-pointer font-weight-bold">
                                <p onClick={() => switchLanguage("en")}>
                                    English
                                </p>
                            </Box>
                            |<Box></Box>
                            <Box className="cursor-pointer " component="span">
                                <p onClick={() => switchLanguage("np")}>
                                    {t("nepali")}
                                </p>
                            </Box>
                        </Box>
                    </FlexBox>
                    <Box className="card">
                        <Box className="card-body rounded">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                <div className="row p-4">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <Label htmlFor="currentPassword">
                                                {t('updatePassword.currentPassword')}

                                            </Label>
                                            <Input
                                                type={`${isTypePassword ? "password" : "text"}`}
                                                value={values.currentPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="currentPassword"
                                                rightIcon={isTypePassword ? <AiFillEyeInvisible onClick={toggleInputType} /> : <AiFillEye onClick={toggleInputType} />}
                                            />
                                            <FormikValidationError
                                                name="currentPassword"
                                                errors={errors}
                                                touched={touched}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <Label htmlFor="newPassword">
                                                {t('updatePassword.newPassword')}
                                            </Label>
                                            <Input
                                                type={`${isTypePassword1 ? "password" : "text"}`}
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="newPassword"
                                                rightIcon={isTypePassword1 ? <AiFillEyeInvisible onClick={toggleInputType1} /> : <AiFillEye onClick={toggleInputType1} />}
                                            />
                                            <FormikValidationError
                                                name="newPassword"
                                                errors={errors}
                                                touched={touched}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <Label htmlFor="confirmNewPassword">
                                                {t('updatePassword.confirmPassword')}
                                            </Label>
                                            <Input
                                                type={`${isTypePassword2 ? "password" : "text"}`}
                                                value={values.confirmNewPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="confirmNewPassword"
                                                rightIcon={isTypePassword2 ? <AiFillEyeInvisible onClick={toggleInputType2} /> : <AiFillEye onClick={toggleInputType2} />}
                                            />
                                            <FormikValidationError
                                                name="confirmNewPassword"
                                                errors={errors}
                                                touched={touched}
                                            />
                                        </div>
                                    </div>
                                    <small className="float-end cursonr-pointer text-info mb-2 text-end">
                                        <Link to={publicRoutePath.login}>
                                            {t('backToLogin')}
                                        </Link>
                                    </small>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-100 btn btn-primary"
                                    >
                                        {t("updatePassword.changePassword")}
                                    </Button>
                                </div>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </FlexBox >
    )
}

export default UpdatePassword
