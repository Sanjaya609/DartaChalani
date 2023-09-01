import React, { useState } from 'react'
import { Box, FlexBox, Image, Text } from '../../../../components/core';
import NepalGovLogo from "../../../../assets/image/nepal-gov.png";
import { useTranslation } from 'react-i18next';
import { switchLanguage } from '../../../../i18/i18';
import Button from '../../../../components/derived/Buttons/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { publicRoutePath } from '../../../../routes/public/publicRoutePath';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import { Input, Label } from '../../../../components/core/FormElement';
import * as yup from "yup"
import { useFormik } from 'formik';
import { UseResetPassword } from './ResetPassword.query';
import { useAuth } from '../../../../providers/ApplicationProvider';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [initialValues, setInitialValues] = useState({
    email: "",
  })
  const { mutateAsync: resetPassword } = UseResetPassword();
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
    validationSchema: yup.object({
      email: yup.string().required(),
    }),
    onSubmit: (values: any) => {
      resetPassword(values, {
        onSuccess: (res: any) => {
          if (res.data.status) {
            setIsAuthenticated(false);
            localStorage.clear();
            navigate(publicRoutePath.login);
            resetForm();
            setInitialValues({
              email: "",
            });
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
                  {" "}
                  {t("localGovernment")}
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
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormikValidationError
                        name="email"
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
                    {t("sendVerificationCode")}
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

export default ResetPassword