import Form from '@/components/functional/Form/Form'
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
                  <Grid.Col sm={'sm:col-span-4'}>
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

                  <Grid.Col sm={'sm:col-span-4'}>
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

                  <Grid.Col sm="sm:col-span-12">
                    <FieldArray
                      name="listOfDropDownDetailRequestDto"
                      render={(arrayHelpers: ArrayHelpers) => {
                        return (
                          <>
                            {values?.listOfDropDownDetailRequestDto?.map(
                              (ropDownDetailRequest, index) => (
                                <Grid
                                  className="mb-4"
                                  key={`resourceRequestList-${index}`}
                                  sm={'sm:grid-cols-12'}
                                  gap="gap-4"
                                >
                                  <Grid.Col sm={'sm:col-span-3'}>
                                    <Form.Input
                                      isFieldArray={{
                                        keyName: 'resourceRequestList',
                                        index,
                                        name: 'resourceName',
                                      }}
                                      value={
                                        values.resourceRequestList[index]
                                          .resourceName
                                      }
                                      id={`resourceRequestList[${index}].resourceName`}
                                      name={`resourceRequestList[${index}].resourceName`}
                                      onChange={handleChange}
                                      errors={errors}
                                      onBlur={handleBlur}
                                      touched={touched}
                                    />
                                  </Grid.Col>

                                  <Grid.Col sm={'sm:col-span-3'}>
                                    <Form.Input
                                      isFieldArray={{
                                        keyName: 'resourceRequestList',
                                        index,
                                        name: 'url',
                                      }}
                                      value={
                                        values.resourceRequestList[index].url
                                      }
                                      id={`resourceRequestList[${index}].url`}
                                      name={`resourceRequestList[${index}].url`}
                                      onChange={handleChange}
                                      errors={errors}
                                      onBlur={handleBlur}
                                      touched={touched}
                                    />
                                  </Grid.Col>

                                  <Grid.Col sm={'sm:col-span-2'}>
                                    <Form.Select
                                      options={HTTPMethodOption}
                                      calculateValueOnChange
                                      isFieldArray={{
                                        keyName: 'resourceRequestList',
                                        index,
                                        name: 'httpMethod',
                                      }}
                                      value={
                                        values.resourceRequestList[index]
                                          .httpMethod
                                      }
                                      id={`resourceRequestList[${index}].httpMethod`}
                                      name={`resourceRequestList[${index}].httpMethod`}
                                      onChange={(event) => {
                                        setFieldValue(event.name, event.main)
                                      }}
                                      errors={errors}
                                      onBlur={handleBlur}
                                      touched={touched}
                                    />
                                  </Grid.Col>

                                  <Grid.Col sm={'sm:col-span-2'}>
                                    <Form.Select
                                      calculateValueOnChange
                                      options={privilegeData}
                                      isFieldArray={{
                                        keyName: 'resourceRequestList',
                                        index,
                                        name: 'privilege',
                                      }}
                                      value={
                                        values.resourceRequestList[index]
                                          .privilege
                                      }
                                      id={`resourceRequestList[${index}].privilege`}
                                      name={`resourceRequestList[${index}].privilege`}
                                      onChange={(event) => {
                                        setFieldValue(event.name, event.main)
                                      }}
                                      errors={errors}
                                      onBlur={handleBlur}
                                      touched={touched}
                                    />
                                  </Grid.Col>

                                  <Grid.Col>
                                    <Flexbox>
                                      {index > 0 && (
                                        <Button
                                          type="button"
                                          className="mr-3"
                                          variant="danger"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          <Icon icon={Trash} />
                                        </Button>
                                      )}
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          arrayHelpers.push({
                                            httpMethod: '',
                                            privilege: '',
                                            resourceName: '',
                                            url: '',
                                          })
                                        }}
                                      >
                                        <Icon fill="#fff" icon={Plus} />
                                      </Button>
                                    </Flexbox>
                                  </Grid.Col>
                                </Grid>
                              )
                            )}

                            {errors &&
                              errors?.resourceRequestList &&
                              typeof errors.resourceRequestList ===
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
