import Form from '@/components/functional/Form/Form'
import { Box, Button, Flexbox, Grid, Icon, Layout } from '@/components/ui'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IValidationsFormSchema } from '../schema/validations.interface'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import { Label } from '@/components/functional/Form/Label/Label'
import { Text } from '@/components/ui/core/Text'
import Modal from '@/components/ui/Modal/Modal'
import { useGetEnumDataWithName } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { Plus, Trash } from 'phosphor-react'
import { useMemo, useState } from 'react'
import {
  ValidationSetupValidationSchema,
  validationSetupInitialValues,
} from '../schema/validations.schema'

interface IValidationSetupProps {
  initialValues: IValidationsFormSchema
  setInitialValues: React.Dispatch<React.SetStateAction<IValidationsFormSchema>>
  isOpenAddEditModal: boolean
  toggleAddEditModal: VoidFunction
}
const ValidationSetup = ({
  initialValues,
  setInitialValues,
  isOpenAddEditModal,
  toggleAddEditModal,
}: IValidationSetupProps) => {
  const { t } = useTranslation()
  const [deleteIdId, setDeleteId] = useState<string | number>('')
  const setOrRemoveDeleteId = (id?: string | number) => setDeleteId(id || '')

  //   const { mutateAsync: createModule, isLoading: isModuleCreating } =
  //     useCreateModule()
  //   const { data: activeModuleListOption } = useGetModuleListByStatus(true, {
  //     enabled: isOpenAddEditModal,
  //   })

  //   const { mutate: deteteModuleResource, isLoading: deleteResourceLoading } =
  //     useDeleteModuleResource()
  //   const handleDeleteById = () => {
  //     deteteModuleResource(deleteIdId, {
  //       onSuccess: () => {
  //         setOrRemoveDeleteId()
  //         toggleAddEditModal()
  //       },
  //     })
  //   }

  const { data: validationTypeData = [] } = useGetEnumDataWithName<
    OptionType[]
  >(APIENUM.VALIDATION_TYPE, {
    mapDatatoStyleSelect: true,
    enabled: isOpenAddEditModal,
  })

  const resetFormWithToggleModal = () => {
    toggleAddEditModal()
    setInitialValues(validationSetupInitialValues)
  }

  const handleSaveModule = (values: typeof validationSetupInitialValues) => {
    const payload = {
      ...values,
    }
    // createModule(payload, {
    //   onSuccess: () => {
    //     resetFormWithToggleModal()
    //   },
    // })
  }

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ValidationSetupValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        handleSaveModule(values)
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
            open={!!isOpenAddEditModal}
            toggleModal={resetFormWithToggleModal}
            size="xl"
            title={
              values?.id ? t('security.module.editModule') : 'Validation Setup'
            }
            saveBtnProps={{
              btnTitle: values?.id ? t('btns.edit') : t('btns.add'),
              btnAction: () => {
                handleSubmit()
              },
              loading: false,
            }}
            cancelBtnProps={{
              btnAction: () => {
                resetFormWithToggleModal()
              },
            }}
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
                      setFieldValue('parentModuleId', e.main)
                    }}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-4'}>
                  <Form.Input
                    label="Regex"
                    value={values.regex}
                    id={`rregex`}
                    name={`rregex`}
                    onChange={handleChange}
                    errors={errors}
                    onBlur={handleBlur}
                    touched={touched}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-5'}>
                  <Form.TextArea
                    withCharacterCount
                    maxLength={500}
                    value={values.errorMessage}
                    errors={errors}
                    touched={touched}
                    name="errorMessage"
                    label="Error Message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                {false && (
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
                      <Grid.Col sm={'sm:col-span-3'}>
                        <Label isRequired label="Validation Type" />
                      </Grid.Col>
                      <Grid.Col sm={'sm:col-span-3'}>
                        <Label isRequired label="Error Message" />
                      </Grid.Col>
                    </Grid>

                    <Box className="relative h-72 w-full">
                      <Layout.Absolute scrollable>
                        <FieldArray
                          name="resourceRequestList"
                          render={(arrayHelpers: ArrayHelpers) => {
                            return (
                              <>
                                {/* {values?.resourceRequestList?.map(
                                  (resourceRequestList, index) => (
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
                                            values.resourceRequestList[index]
                                              .url
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
                                            setFieldValue(
                                              event.name,
                                              event.main
                                            )
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
                                            setFieldValue(
                                              event.name,
                                              event.main
                                            )
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
                                                values.resourceRequestList[
                                                  index
                                                ].id
                                                  ? setOrRemoveDeleteId(
                                                      values
                                                        .resourceRequestList[
                                                        index
                                                      ].id
                                                    )
                                                  : arrayHelpers.remove(index)
                                              }
                                            >
                                              <Icon icon={Trash} />
                                            </Button>
                                          )}
                                          {values.resourceRequestList.length -
                                            1 ===
                                            index && (
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
                                          )}
                                        </Flexbox>
                                      </Grid.Col>
                                    </Grid>
                                  )
                                )} */}

                                {/* {errors &&
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
                                  )} */}
                              </>
                            )
                          }}
                        />
                      </Layout.Absolute>
                    </Box>
                  </Grid.Col>
                )}
              </Grid>
            </form>

            {/* <Box className="mt-4 text-right">
        <Button
          disabled={isLoading}
          type="button"
          onClick={() => {
            setInitialValues(moduleSetupInitialValues)
            resetForm()
          }}
          btnType="outlined"
          variant="secondary"
          className="mr-3"
        >
          {t('btns.cancel')}
        </Button>
        <Button type="submit" className="ml-auto">
          Save
        </Button>
      </Box> */}

            {/* <Modal
              open={!!deleteIdId}
              toggleModal={setOrRemoveDeleteId}
              size="md"
              title={t('security.module.modal.resourceDelete.title')}
              saveBtnProps={{
                btnAction: handleDeleteById,
                loading: deleteResourceLoading,
                btnTitle: t('btns.delete'),
              }}
            >
              {t('security.module.modal.resourceDelete.description')}
            </Modal> */}
          </Modal>
        )
      }}
    </Formik>
  )
}

export default ValidationSetup
