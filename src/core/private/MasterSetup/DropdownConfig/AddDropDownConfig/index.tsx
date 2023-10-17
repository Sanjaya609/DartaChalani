import Form from '@/components/functional/Form/Form'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { privateRoutePath, useNavigate } from '@/router'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  dropdownConfigInitialValue,
  dropdownConfigSchema,
} from './schema/dropdown-config.schema'

const AddDropDownConfig = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToList = () => {
    navigate(privateRoutePath.masterSetup.dropdownConfig.base)
  }

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={dropdownConfigInitialValue}
      validationSchema={dropdownConfigSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        // handleSaveModule(values)
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
      }) => {
        return (
          <>
            <SectionHeader
              title={t('dispatchBook.title')}
              backAction={navigateToList}
            />
            <ContainerLayout className="scrollbars grow">
              <form>
                <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                  <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                      value={values.dropDownDescriptionEn}
                      errors={errors}
                      touched={touched}
                      name="dropDownDescriptionEn"
                      label={t(
                        'masterSetup.dropdownConfig.dropDownDescriptionEn'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid.Col>

                  <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                      value={values.dropDownDescriptionNp}
                      errors={errors}
                      touched={touched}
                      name="dropDownDescriptionNp"
                      label={t(
                        'masterSetup.dropdownConfig.dropDownDescriptionNp'
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid.Col>

                  <Grid.Col sm="sm:col-span-10">
                    <FieldArray
                      name="listOfDropDownDetailRequestDto"
                      render={(arrayHelpers: ArrayHelpers) => {
                        return (
                          <>
                            {values?.listOfDropDownDetailRequestDto?.map(
                              (dropDownDetailRequest, index) => (
                                <>
                                  <Grid
                                    className="mb-4"
                                    key={`dropDownDetailRequest-${index}`}
                                    sm={'sm:grid-cols-12'}
                                    gap="gap-4"
                                  >
                                    <Grid.Col sm={'sm:col-span-3'}>
                                      <Form.Input
                                        label={t(
                                          'masterSetup.dropdownConfig.descriptionEn'
                                        )}
                                        isFieldArray={{
                                          keyName:
                                            'listOfDropDownDetailRequestDto',
                                          index,
                                          name: 'descriptionEn',
                                        }}
                                        value={
                                          values.listOfDropDownDetailRequestDto[
                                            index
                                          ].descriptionEn
                                        }
                                        id={`listOfDropDownDetailRequestDto[${index}].descriptionEn`}
                                        name={`listOfDropDownDetailRequestDto[${index}].descriptionEn`}
                                        onChange={handleChange}
                                        errors={errors}
                                        onBlur={handleBlur}
                                        touched={touched}
                                      />
                                    </Grid.Col>

                                    <Grid.Col sm={'sm:col-span-3'}>
                                      <Form.Input
                                        label={t(
                                          'masterSetup.dropdownConfig.descriptionNp'
                                        )}
                                        isFieldArray={{
                                          keyName:
                                            'listOfDropDownDetailRequestDto',
                                          index,
                                          name: 'descriptionNp',
                                        }}
                                        value={
                                          values.listOfDropDownDetailRequestDto[
                                            index
                                          ].descriptionNp
                                        }
                                        id={`listOfDropDownDetailRequestDto[${index}].descriptionNp`}
                                        name={`listOfDropDownDetailRequestDto[${index}].descriptionNp`}
                                        onChange={handleChange}
                                        errors={errors}
                                        onBlur={handleBlur}
                                        touched={touched}
                                      />
                                    </Grid.Col>
                                  </Grid>
                                  <Grid.Col sm="sm:col-span-12">
                                    <Button
                                      variant="secondary"
                                      btnType="outlined"
                                    >
                                      Add Extra Description
                                    </Button>
                                  </Grid.Col>
                                </>
                              )
                            )}

                            {errors &&
                              errors?.listOfDropDownDetailRequestDto &&
                              typeof errors.listOfDropDownDetailRequestDto ===
                                'string' && (
                                <Grid
                                  className="mb-4"
                                  sm={'sm:grid-cols-12'}
                                  gap="gap-4"
                                >
                                  <Grid.Col sm="sm:col-span-12">
                                    <FormikValidationError
                                      errors={errors}
                                      touched={touched}
                                      name="properties"
                                    />
                                  </Grid.Col>
                                </Grid>
                              )}
                          </>
                        )
                      }}
                    />
                  </Grid.Col>
                </Grid>
              </form>
            </ContainerLayout>

            <Box className=" w-full border-2  text-right">
              <ContainerLayout>
                <Button
                  type="button"
                  btnType="outlined"
                  variant="secondary"
                  className="mr-3"
                  onClick={navigateToList}
                >
                  {t('btns.cancel')}
                </Button>
                <Button type="submit" onClick={() => {}} className="ml-auto">
                  {/* {dispatchBookId ? t('btns.update') : t('btns.save')} */}
                </Button>
              </ContainerLayout>
            </Box>
          </>
        )
      }}
    </Formik>
  )
}

export default AddDropDownConfig
