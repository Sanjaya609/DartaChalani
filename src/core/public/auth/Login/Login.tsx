import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import NepalGovLogo from "../../../../assets/image/nepal-gov.png";
import FormikValidationError from "../../../../components/FormikValidationError/FormikValidationError";
import { Box, FlexBox, Image, Text } from "../../../../components/core";
import { Input, Label } from "../../../../components/core/FormElement";
import Button from "../../../../components/derived/Buttons/Buttons";
import { switchLanguage } from "../../../../i18/i18";
import { useAuth } from "../../../../providers/ApplicationProvider";
import { privateRoutePath } from "../../../../routes/private/privateRoutePath";
import { publicRoutePath } from "../../../../routes/public/publicRoutePath";
import { parseJwt } from "../../../../utils/encodeDecodeToken";
import { setToken } from "../../../../utils/tokenService";
import { LoginResponse, useLoginPost } from "./service/login.query";

function Login() {
  const { mutate, isLoading } = useLoginPost();
  const { setIsAuthenticated } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required('login.loginValidation.username').matches(/^\S*$/, 'login.loginValidation.usernameWhitespace'),
      password: yup.string().required('login.loginValidation.password'),
    }),
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: values.password,
        grant_type: "password",
      };
      mutate(payload, {
        onSuccess: (response) => {
          if (response.data) {
            let data = response.data as LoginResponse;
            const decodedToken = parseJwt(data?.access_token)
            if (decodedToken?.isPasswordChanged) {
              setToken(data.access_token);
              setIsAuthenticated(true);
              resetForm();
              navigate(privateRoutePath.root);
            } else {
              setIsAuthenticated(false);
              setToken(data.access_token);
              localStorage.setItem('firstLoginToken', data?.access_token);
              navigate(publicRoutePath?.updatePassword)
            }
          }
        },
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
        <Box className="col-sm-6 col-md-6 col-lg-6 mt-5">
          <Box className="card rounded-3">
            <Box className="card-body p-6" >
              <FlexBox align="center" justify="space-between" className="mb-6">
                <FlexBox align="center" justify="flex-start" className="grow">
                  <Image src={NepalGovLogo} alt="nepal gov logo" className="h-8 w-8" />
                  <Box className="ml-2">
                    <Text variant="h3">{t("common.projectTitle")}</Text>
                  </Box>
                </FlexBox>
                <Box className="my-3 my-md-0 ml-1 d-flex">
                  <Box component="span" className="cursor-pointer font-weight-bold">
                    <p onClick={() => switchLanguage("en")}>
                      {t('common.english')}
                    </p>
                  </Box>{" "}
                  |<Box></Box>
                  <Box className="cursor-pointer " component="span">
                    <p onClick={() => switchLanguage("np")}>
                      {t("common.nepali")}
                    </p>
                  </Box>
                </Box>
              </FlexBox>
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                  <Label htmlFor="" className="text-lg bold">{`${t("login.loginTitle")}`}</Label>
                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                  <Label htmlFor="">{`${t("login.loginDesc")}`}</Label>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="row mt-4">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Label htmlFor="">{`${t("username")}/  ${t(
                        "email"
                      )}`}</Label>
                      <Input
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="username"
                      />
                      <FormikValidationError
                        name="username"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <Label htmlFor="">{t("password")}</Label>
                      <Input
                        type={passwordVisible ? 'text' : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rightIcon={passwordVisible ? <AiFillEyeInvisible size={14} onClick={() => setPasswordVisible(false)} /> : <AiFillEye size={14} onClick={() => setPasswordVisible(true)} />}
                      />
                      <FormikValidationError
                        name="password"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                  </div>
                  <FlexBox justify="space-between">
                    <small className="float-end cursonr-pointer text-info mb-2">
                      <Link to={publicRoutePath.resetPassword}>
                        {t("rememberMe")}
                      </Link>
                    </small>
                    <small className="float-end cursonr-pointer text-info mb-2">
                      <Link to={publicRoutePath.resetPassword}>
                        {t("forgotPassword")}?
                      </Link>
                    </small>
                  </FlexBox>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-success"
                  >
                    {!isLoading ? t("login.title") : `${t("loggingIn")}...`}
                  </Button>
                </div>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </FlexBox >
  );
}

export default Login;
