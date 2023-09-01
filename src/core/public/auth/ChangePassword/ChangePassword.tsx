import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import NepalGovLogo from "../../../../assets/image/nepal-gov.png";
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { Box, FlexBox, Image, Text } from '../../../../components/core';
import { Input, Label } from '../../../../components/core/FormElement';
import Button from '../../../../components/derived/Buttons/Buttons';
import { switchLanguage } from '../../../../i18/i18';
import { useAuth } from '../../../../providers/ApplicationProvider';
import { publicRoutePath } from '../../../../routes/public/publicRoutePath';
import { UseChangePassword } from './ChangePassword.query';
import { ChangePasswordFormSchema, ChangePasswordFormValidation, ChangePasswordInitialValues, ChangePasswordPayload } from './changePassword.schema';

function ChangePassword() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { t } = useTranslation();
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<ChangePasswordFormSchema>(ChangePasswordInitialValues)
  const [isTypePassword, setIsTypePassword] = useState<boolean>(true)
  const [isTypePassword1, setIsTypePassword1] = useState<boolean>(true)
  const toggleInputType = () => setIsTypePassword(!isTypePassword);
  const toggleInputType1 = () => setIsTypePassword1(!isTypePassword1);
  const { mutateAsync: changePassword } = UseChangePassword();
  // console.log(searchParams, 'searchParams.get("token")')
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
    validationSchema: ChangePasswordFormValidation,
    onSubmit: (values: ChangePasswordFormSchema) => {
      const payload: ChangePasswordPayload = {
        confirmNewPassword: values?.confirmNewPassword,
        newPassword: values?.newPassword,
        token: urlSearchParams.get('token') ?? "",
      }
      changePassword(payload, {
        onSuccess: (res: any) => {
          if (res.data.status) {
            setIsAuthenticated(false);
            localStorage.clear();
            navigate(publicRoutePath.login);
            resetForm();
            setInitialValues(ChangePasswordInitialValues);
            toastNotify.success(res.data.message);
          }
        },
        onError: (err: any) => {
          toastNotify.error(err.message)
        }
      });
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
                  {" "}
                  {t("projectOfficeName")} {t("projectOfficeAddress")}
                </Text>
              </Box>
            </FlexBox>
            <Box className="my-3 my-md-0 ml-1 d-flex">
              <Box component="span" className="cursor-pointer font-weight-bold">
                <p onClick={() => switchLanguage("en")}>
                  English
                </p>
              </Box>{" "}
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
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Label htmlFor="confirmNewPassword">
                        {t('updatePassword.confirmPassword')}
                      </Label>
                      <Input
                        type={`${isTypePassword1 ? "password" : "text"}`}
                        value={values.confirmNewPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="confirmNewPassword"
                        rightIcon={isTypePassword1 ? <AiFillEyeInvisible onClick={toggleInputType1} /> : <AiFillEye onClick={toggleInputType1} />}
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
                    // disabled={isLoading}
                    className="w-100 btn btn-primary"
                  >
                    {/* {!isLoading ? t("login") : `${t("loggingIn")}...`} */}
                    Change Password
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

export default ChangePassword