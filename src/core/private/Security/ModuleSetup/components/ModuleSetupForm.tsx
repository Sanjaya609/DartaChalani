import Form from '@/components/functional/Form/Form'
import { Button, Flexbox, Grid, Icon } from '@/components/ui'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { IModuleSetupFormSchema } from '../schema/moduleSetup.interface'
import {
  HTTPMethodOption,
  moduleSetupInitialValues,
  moduleSetupValidationSchema,
} from '../schema/moduleSetup.schema'
import {
  useCreateModule,
  useGetModuleListByStatus,
} from '../services/moduleSetup.query'

import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import { Label } from '@/components/functional/Form/Label/Label'
import { Text } from '@/components/ui/core/Text'
import Modal from '@/components/ui/Modal/Modal'
import { useGetEnumDataWithName } from '@/service/generic/generic.query'
import { APIENUM } from '@/utility/enums/api.enum'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { mapDataToStyledSelect } from '@/utility/react-select-helper'
import { Plus, Trash } from 'phosphor-react'
import { useMemo } from 'react'

interface IModuleSetupFormProps {
  initialValues: IModuleSetupFormSchema
  setInitialValues: React.Dispatch<React.SetStateAction<IModuleSetupFormSchema>>
  isOpenAddEditModal: boolean
  toggleAddEditModal: VoidFunction
}
const ModuleSetupForm = ({
  initialValues,
  setInitialValues,
  isOpenAddEditModal,
  toggleAddEditModal,
}: IModuleSetupFormProps) => {
  const { t } = useTranslation()
  const { mutateAsync: createModule, isLoading: isModuleCreating } =
    useCreateModule()
  const { data: activeModuleListOption } = useGetModuleListByStatus(true, {
    enabled: isOpenAddEditModal,
  })

  const { data: privilegeData = [] } = useGetEnumDataWithName<OptionType[]>(
    APIENUM.PRIVILEGE,
    {
      mapDatatoStyleSelect: true,
      enabled: isOpenAddEditModal,
    }
  )

  const resetFormWithToggleModal = () => {
    toggleAddEditModal()
    setInitialValues(moduleSetupInitialValues)
  }

  const handleSaveModule = (values: typeof moduleSetupInitialValues) => {
    const payload = {
      ...values,
      parentModuleId: values?.parentModuleId || null,
      resourceRequestList: values?.isConfigurable
        ? values?.resourceRequestList
        : [],
      orderNumber: +values?.orderNumber,
    }
    createModule(payload, {
      onSuccess: () => {
        resetFormWithToggleModal()
      },
    })
  }

  const notConfigurableParentModuleList = useMemo(() => {
    const moduleList =
      activeModuleListOption?.filter((module) => !module.isConfigurable) || []
    return mapDataToStyledSelect({
      arrayData: moduleList,
      id: 'id',
      name: 'moduleNameEnglish',
      nameNp: 'moduleNameNepali',
    })
  }, [activeModuleListOption])

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={initialValues}
      validationSchema={moduleSetupValidationSchema}
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
              values?.id
                ? t('security.module.editModule')
                : t('security.module.addModule')
            }
            saveBtnProps={{
              btnTitle: values?.id ? t('btns.edit') : t('btns.add'),
              btnAction: () => {
                handleSubmit()
              },
              loading: isModuleCreating,
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
                    value={values.parentModuleId}
                    errors={errors}
                    touched={touched}
                    options={notConfigurableParentModuleList || []}
                    name="parentModuleId"
                    label={t('security.module.parentModuleName')}
                    onChange={(e) => {
                      setFieldValue('parentModuleId', e.main)
                    }}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-1'}>
                  <Form.Input
                    isRequired
                    value={values.code}
                    errors={errors}
                    touched={touched}
                    name="code"
                    label={t('security.module.code')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                  <Form.Input
                    isRequired
                    value={values.moduleNameEnglish}
                    errors={errors}
                    touched={touched}
                    name="moduleNameEnglish"
                    label={t('security.module.moduleNameEnglish')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>
                <Grid.Col sm={'sm:col-span-4'}>
                  <Form.Input
                    isRequired
                    isNepali
                    value={values.moduleNameNepali}
                    errors={errors}
                    touched={touched}
                    name="moduleNameNepali"
                    label={t('security.module.moduleNameNepali')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-3'}>
                  <Form.Input
                    isRequired
                    value={values.url}
                    errors={errors}
                    touched={touched}
                    name="url"
                    label={t('security.module.url')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-1'}>
                  <Form.Input
                    isRequired
                    value={values.orderNumber}
                    errors={errors}
                    touched={touched}
                    name="orderNumber"
                    label={t('security.module.orderNumber')}
                    onChange={(event) => {
                      inputChangeNumberOnly({
                        event,
                        handleChange,
                      })
                    }}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-4'}>
                  <Form.Input
                    isRequired
                    value={values.description}
                    errors={errors}
                    touched={touched}
                    name="description"
                    label={t('security.module.description')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                <Grid.Col sm={'sm:col-span-2'}>
                  <Form.Switch
                    isRequired
                    className="inline"
                    checked={values.isConfigurable}
                    errors={errors}
                    touched={touched}
                    name="isConfigurable"
                    label={t('security.module.isConfigurable')}
                    onChange={() => {
                      setFieldValue('isConfigurable', !values.isConfigurable)
                    }}
                    onBlur={handleBlur}
                  />
                </Grid.Col>

                {values?.isConfigurable && (
                  <Grid.Col sm="sm:col-span-12">
                    <Label
                      isRequired
                      label={
                        <Text typeface="semibold" className="mb-3">
                          {t('security.module.resource')}
                        </Text>
                      }
                    />

                    <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                      <Grid.Col sm={'sm:col-span-3'}>
                        <Label
                          isRequired
                          label={t(
                            'security.module.resourceRequestList.resourceName'
                          )}
                        />
                      </Grid.Col>
                      <Grid.Col sm={'sm:col-span-3'}>
                        <Label
                          isRequired
                          label={t('security.module.resourceRequestList.url')}
                        />
                      </Grid.Col>

                      <Grid.Col sm={'sm:col-span-2'}>
                        <Label
                          isRequired
                          label={t(
                            'security.module.resourceRequestList.httpMethod'
                          )}
                        />
                      </Grid.Col>

                      <Grid.Col sm={'sm:col-span-2'}>
                        <Label
                          isRequired
                          label={t(
                            'security.module.resourceRequestList.privilege'
                          )}
                        />
                      </Grid.Col>
                    </Grid>

                    <FieldArray
                      name="resourceRequestList"
                      render={(arrayHelpers: ArrayHelpers) => {
                        return (
                          <>
                            {values?.resourceRequestList?.map(
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
          </Modal>
        )
      }}
    </Formik>
  )
}

export default ModuleSetupForm
