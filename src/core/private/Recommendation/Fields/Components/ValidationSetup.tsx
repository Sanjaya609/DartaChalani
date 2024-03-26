import { useState } from 'react'
import Form from '@/components/functional/Form/Form'
import { Box, Button, Flexbox, Grid, Icon, Layout } from '@/components/ui'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IValidationsFormSchema } from '../schema/validations.interface'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import { Label } from '@/components/functional/Form/Label/Label'
import { Text } from '@/components/ui/core/Text'
import Modal from '@/components/ui/Modal/Modal'
import { Trash } from 'phosphor-react'
import {
  ValidationSetupValidationSchema,
  validationSetupInitialValues,
  valueRequiringValidationType,
} from '../schema/validations.schema'
import {
  useCreateFieldValidation,
  useDeleteFieldValidationById,
  useGetAllValidationByFieldId,
  useGetValidationTypeByEnumKey,
} from '../services/fields.query'
import { getValidationEnumForFieldType } from '../../utils'

interface IValidationSetupProps {
  initialValues: IValidationsFormSchema
  setInitialValues: React.Dispatch<React.SetStateAction<IValidationsFormSchema>>
  openValidationModal: boolean
  toggleValidationModal: VoidFunction
  fieldId: number | string
  fieldType: string
}
const ValidationSetup = ({
  initialValues,
  openValidationModal,
  toggleValidationModal,
  fieldId,
  fieldType,
}: IValidationSetupProps) => {
  const { t } = useTranslation()
  const [deleteIdId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

  const {
    mutateAsync: createFieldValidation,
    isLoading: createFieldValidationLoading,
  } = useCreateFieldValidation()
  const { data: validationList, isFetching: validationListFetching } =
    useGetAllValidationByFieldId(fieldId)

  const {
    mutate: deleteValidationById,
    isLoading: deleteValidationByIdLoading,
  } = useDeleteFieldValidationById()

  const handleDeleteById = () => {
    deleteValidationById(deleteIdId, {
      onSuccess: () => {
        setOrRemoveDeleteId()
      },
    })
  }

  const { data: validationTypes } = useGetValidationTypeByEnumKey(
    getValidationEnumForFieldType(fieldType)
  )
  const validationTypeData: OptionType[] = validationTypes?.map(
    (validation: any) =>
      ({
        label: validation?.nameEnglish,
        labelNp: validation?.nameNepali,
        value: validation?.key,
      } || [])
  )

  console.log(validationTypes, 'filtetr here')

  const resetFormWithToggleModal = () => {
    // toggleValidationModal()
    // setInitialValues(validationSetupInitialValues)
  }

  const handleSaveValidation = (
    values: typeof validationSetupInitialValues
  ) => {
    const payload = {
      ...values,
      fieldId: fieldId ?? 0,
    }
    createFieldValidation(payload, {
      onSuccess: () => {
        // resetFormWithToggleModal()
      },
    })
  }

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ValidationSetupValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(false)
        handleSaveValidation(values)
        resetForm()
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
          <Modal
            centered={false}
            open={!!openValidationModal}
            toggleModal={() => {
              resetFormWithToggleModal()
              toggleValidationModal()
            }}
            size="xl"
            title={
              values?.id ? t('security.module.editModule') : 'Validation Setup'
            }
            hideFooter
          >
            <form onSubmit={handleSubmit}>
              <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                <Grid.Col sm={'sm:col-span-3'}>
                  <Form.Select
                    calculateValueOnChange
                    value={values.validationType}
                    errors={errors}
                    touched={touched}
                    options={validationTypeData || []}
                    name="validationType"
                    label={'Validation Type'}
                    onChange={(e) => {
                      setFieldValue('validationType', e.main)
                    }}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                {/* <Grid.Col sm={'sm:col-span-4'}>
                  <Form.Input
                    label="Regex"
                    value={values.regex}
                    id={`regex`}
                    name={`regex`}
                    onChange={handleChange}
                    errors={errors}
                    onBlur={handleBlur}
                    touched={touched}
                  />
                </Grid.Col> */}

                {valueRequiringValidationType?.includes(
                  values?.validationType
                ) && (
                  <Grid.Col sm={'sm:col-span-4'}>
                    <Form.Input
                      label="Value"
                      value={values.value}
                      id={`value`}
                      name={`value`}
                      onChange={handleChange}
                      errors={errors}
                      onBlur={handleBlur}
                      touched={touched}
                    />
                  </Grid.Col>
                )}

                <Grid.Col sm={'sm:col-span-5'}>
                  <Form.TextArea
                    withCharacterCount
                    maxLength={300}
                    value={values.errorMessage}
                    errors={errors}
                    touched={touched}
                    name="errorMessage"
                    label="Error Message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-12'}>
                  <></>
                  <div className="my-3 flex justify-end">
                    <div></div>
                    <div>
                      <Button
                        type="button"
                        btnType="outlined"
                        variant="secondary"
                        className="mr-3"
                        onClick={() => {
                          resetFormWithToggleModal()
                          toggleValidationModal()
                        }}
                      >
                        {t('btns.cancel')}
                      </Button>

                      <Button type="submit" className="ml-auto">
                        Save
                      </Button>
                    </div>
                  </div>
                </Grid.Col>

                {validationList?.length ? (
                  <Grid.Col sm="sm:col-span-12">
                    <Label
                      isRequired
                      label={
                        <Text typeface="semibold" className="mb-3">
                          Validations
                        </Text>
                      }
                    />

                    <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                      <Grid.Col sm={'sm:col-span-4'}>
                        <Label isRequired label="Validation Type" />
                      </Grid.Col>
                      <Grid.Col sm={'sm:col-span-8'}>
                        <Label isRequired label="Error Message" />
                      </Grid.Col>
                    </Grid>

                    <Box className="relative h-72 w-full">
                      <Layout.Absolute scrollable>
                        <>
                          {validationList?.map((validation, index) => (
                            <Grid
                              className="mb-4"
                              key={`${validation.fieldId}-${validation.validationType}${index}`}
                              sm={'sm:grid-cols-12'}
                              gap="gap-4"
                            >
                              <Grid.Col sm={'sm:col-span-4'}>
                                <Label label={`${validation.validationType}`} />
                              </Grid.Col>
                              <Grid.Col sm={'sm:col-span-4'}>
                                <Label label={`${validation.errorMessage}`} />
                              </Grid.Col>

                              <Grid.Col>
                                <Flexbox>
                                  <Button
                                    type="button"
                                    className="mr-3"
                                    variant="danger"
                                    onClick={() => {
                                      setOrRemoveDeleteId(validation.id)
                                    }}
                                  >
                                    <Icon icon={Trash} />
                                  </Button>
                                </Flexbox>
                              </Grid.Col>
                            </Grid>
                          ))}
                        </>
                      </Layout.Absolute>
                    </Box>
                  </Grid.Col>
                ) : null}
              </Grid>
            </form>

            <Modal
              open={!!deleteIdId}
              toggleModal={setOrRemoveDeleteId}
              size="md"
              title="Delete Validation"
              saveBtnProps={{
                btnAction: handleDeleteById,
                loading: validationListFetching,
                btnTitle: t('btns.delete'),
              }}
              cancelBtnProps={{
                btnAction: () => setOrRemoveDeleteId(),
              }}
            >
              Are you sure you want to delete this resource?
            </Modal>
          </Modal>
        )
      }}
    </Formik>
  )
}

export default ValidationSetup
