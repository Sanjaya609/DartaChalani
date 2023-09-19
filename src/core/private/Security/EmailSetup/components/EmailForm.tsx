import Form from '@/components/functional/Form/Form'
import { Label } from '@/components/functional/Form/Label/Label'
import { Box, Button, Flexbox, Grid, Icon } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import FlexLayout from '@/components/ui/core/Layout/FlexLayout'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { FieldArray, Formik, ArrayHelpers } from 'formik'
import { DeleteIcon } from 'lucide-react'
import { Plus, Trash } from 'phosphor-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  emailInitialValue,
  emailValidationSchema,
} from '../schema/email.schema'
import { useCreateEmailSetup } from '../services/email.query'

interface ISectorFormProps {}

const SectorForm = (props: ISectorFormProps) => {
  const [initialValues, setInitialValues] = useState(emailInitialValue)

  const { mutate, isLoading } = useCreateEmailSetup()

  const { t } = useTranslation()

  return (
    <ContainerLayout stretch>
      <FlexLayout direction="column">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            // saveConfig(values)
          }}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            handleBlur,
          }) => {
            return (
              <>
                <form onSubmit={handleSubmit} className="w-full">
                  <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                    <Grid.Col sm={'sm:col-span-3'}>
                      <Form.Input
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
                      <Form.Input
                        isNepali
                        value={values.password}
                        errors={errors}
                        touched={touched}
                        name="password"
                        label={t('security.email.password')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>

                    <Grid.Col sm={'sm:col-span-3'}>
                      <Form.Input
                        isNepali
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
                        isNepali
                        value={values.port}
                        errors={errors}
                        touched={touched}
                        name="port"
                        label={t('security.email.port')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid.Col>

                    <Grid.Col sm="sm:col-span-12">
                      <Label label={t('security.email.property')} />

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
                                          arrayHelpers.insert(index, {
                                            privilegeId: '',
                                            method: '',
                                            url: '',
                                          })
                                        }}
                                      >
                                        <Icon fill="#fff" icon={Plus} />
                                      </Button>
                                    </Flexbox>
                                  </Grid.Col>
                                </Grid>
                              ))}
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

export default SectorForm
