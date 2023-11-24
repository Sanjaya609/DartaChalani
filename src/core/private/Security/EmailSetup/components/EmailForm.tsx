import Form from '@/components/functional/Form/Form'
import { Label } from '@/components/functional/Form/Label/Label'
import PasswordInput from '@/components/functional/PasswordInput'
import { Box, Button, Flexbox, Grid, Icon } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { Plus, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  emailInitialValue,
  emailValidationSchema,
} from '../schema/email.schema'
import { useCreateEmailSetup, useGetEmailSetup } from '../services/email.query'
import { inputChangeNumberWithComparisonAndLength } from '@/utility/inputUtils/input-change-utils'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import { Text } from '@/components/ui/core/Text'

const EmailForm = () => {
  const [initialValues, setInitialValues] = useState(emailInitialValue)

  const { t } = useTranslation()
  const { mutate: saveEmailConfig, isLoading } = useCreateEmailSetup()
  const { data: emailSetupData } = useGetEmailSetup()

  useEffect(() => {
    if (emailSetupData?.id) {
      setInitialValues(emailSetupData)
    }
  }, [emailSetupData])

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            saveEmailConfig(values, {
              onSuccess: () => {
                setInitialValues(emailInitialValue)
              },
            })
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => {
            return (
              <>
                <form onSubmit={handleSubmit} className="w-full">
                  <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                    <Grid.Col sm={'sm:col-span-3'}>
                      <Form.Input
                        isRequired
                        autoComplete="new-email"
                        value={values.email}
                        errors={errors}
                        touched={touched}
                        name="email"
                        label={t('security.email.email')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>
                    <Grid.Col sm={'sm:col-span-3'}>
                      <PasswordInput
                        isRequired
                        autoComplete="new-password"
                        value={values.password}
                        errors={errors}
                        touched={touched}
                        id="password"
                        label={t('security.email.password')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>

                    <Grid.Col sm={'sm:col-span-3'}>
                      <Form.Input
                        isRequired
                        value={values.host}
                        errors={errors}
                        touched={touched}
                        name="host"
                        label={t('security.email.host')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>

                    <Grid.Col sm={'sm:col-span-3'}>
                      <Form.Input
                        isRequired
                        value={values.port}
                        errors={errors}
                        touched={touched}
                        name="port"
                        label={t('security.email.port')}
                        onChange={(event) => {
                          inputChangeNumberWithComparisonAndLength({
                            event,
                            length: 5,
                            handleChange,
                          })
                        }}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>

                    <Grid.Col sm="sm:col-span-12">
                      <Label
                        label={
                          <Text typeface="semibold" className="mb-3">
                            {t('security.email.property')}
                          </Text>
                        }
                      />
                      <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                        <Grid.Col sm={'sm:col-span-3'}>
                          <Label label={t('security.email.key')} isRequired />
                        </Grid.Col>

                        <Grid.Col sm={'sm:col-span-3'}>
                          <Label label={t('security.email.value')} isRequired />
                        </Grid.Col>
                      </Grid>

                      <FieldArray
                        name="properties"
                        render={(arrayHelpers: ArrayHelpers) => {
                          return (
                            <>
                              {values?.properties?.map((property, index) => (
                                <Grid
                                  className="mb-4"
                                  key={`properties-${index}`}
                                  sm={'sm:grid-cols-12'}
                                  gap="gap-4"
                                >
                                  <Grid.Col sm={'sm:col-span-3'}>
                                    <Form.Input
                                      placeholder={t('security.email.key')}
                                      isFieldArray={{
                                        keyName: 'properties',
                                        index,
                                        name: 'key',
                                      }}
                                      value={values.properties[index].key}
                                      id={`properties[${index}].key`}
                                      name={`properties[${index}].key`}
                                      onChange={handleChange}
                                      errors={errors}
                                      onBlur={handleBlur}
                                      touched={touched}
                                    />
                                  </Grid.Col>

                                  <Grid.Col sm={'sm:col-span-3'}>
                                    <Form.Input
                                      placeholder={t('security.email.value')}
                                      isFieldArray={{
                                        keyName: 'properties',
                                        index,
                                        name: 'value',
                                      }}
                                      value={values.properties[index].value}
                                      id={`properties[${index}].value`}
                                      name={`properties[${index}].value`}
                                      onChange={handleChange}
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
                                            key: '',
                                            value: '',
                                          })
                                        }}
                                      >
                                        <Icon fill="#fff" icon={Plus} />
                                      </Button>
                                    </Flexbox>
                                  </Grid.Col>
                                </Grid>
                              ))}

                              {errors &&
                                errors?.properties &&
                                typeof errors.properties === 'string' && (
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

                  <Box className="mt-4 text-right">
                    <Button
                      disabled={isLoading}
                      loading={isLoading}
                      className="ml-auto"
                    >
                      {t('btns.save')}
                    </Button>
                  </Box>
                </form>
              </>
            )
          }}
        </Formik>
      </FlexLayout>
    </ContainerLayout>
  )
}

export default EmailForm
