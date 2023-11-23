import Form from '@/components/functional/Form/Form'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Flexbox, Grid, Icon } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { decodeParams } from '@/utility/route-params'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { DotsThreeOutlineVertical, Plus, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  useCreateDropdownConfig,
  useGetDropdownConfigById,
} from '../services/dropdown-config.query'
import { IDropdownConfigInitialValue } from './schema/dropdown-config.interface'
import {
  dropdownConfigInitialValue,
  dropdownConfigSchema,
  IDropdownFieldConfigInitialValue,
} from './schema/dropdown-config.schema'

const AddDropDownConfig = () => {
  const { t } = useTranslation()
  const [dropdownInitialValueState, setDropdownInitialValueState] = useState(
    dropdownConfigInitialValue
  )
  const navigate = useNavigate()

  const params = useParams()
  const dropdownId = decodeParams<string>(params?.id)

  const { mutate: createDropDownConfig } = useCreateDropdownConfig()
  const { data: dropdownConfigDetails } = useGetDropdownConfigById(dropdownId)

  useEffect(() => {
    if (dropdownConfigDetails && params?.id) {
      const {
        dropDownDescriptionEn,
        dropDownDescriptionNp,
        dropDownDetailResponseDtoList,
        isActive,
        id,
      } = dropdownConfigDetails
      setDropdownInitialValueState({
        id,
        dropDownDescriptionEn,
        dropDownDescriptionNp,
        isActive,
        listOfDropDownDetailRequestDto:
          dropDownDetailResponseDtoList?.map((dropDown) => ({
            descriptionEn: dropDown.descriptionEn,
            descriptionNp: dropDown.descriptionNp,
            isActive: dropDown.isActive,
            id: dropDown.id,
            dropDownId: dropDown.dropDownId,
            fieldValues: [
              { field: dropDown.field1 || '', value: dropDown.value1 || '' },
              { field: dropDown.field2 || '', value: dropDown.value2 || '' },
              { field: dropDown.field3 || '', value: dropDown.value3 || '' },
              { field: dropDown.field4 || '', value: dropDown.value4 || '' },
            ].filter((field) => !!field.field),
          })) || [],
      })
    }
  }, [dropdownConfigDetails])

  const navigateToList = () => {
    navigate(privateRoutePath.masterSetup.dropdownConfig.base)
    setDropdownInitialValueState(dropdownConfigInitialValue)
  }

  const handleSaveDropDown = (values: IDropdownFieldConfigInitialValue) => {
    const listOfDropDownDetailRequestDto =
      values?.listOfDropDownDetailRequestDto?.map((list) => {
        const mappedFieldsVal = list.fieldValues?.reduce(
          (accField, currField, index) => {
            const mappedField = {
              ...accField,

              [`field${index + 1}`]: currField.field,
              [`value${index + 1}`]: currField.value,
            }

            return mappedField
          },
          {}
        )

        debugger
        return {
          ...(list.dropDownId && { dropDownId: list.dropDownId }),
          ...(list.id && { id: list.id }),
          descriptionEn: list.descriptionEn,
          descriptionNp: list.descriptionNp,
          ...mappedFieldsVal,
        }
      })

    const reqData = {
      dropDownDescriptionEn: values.dropDownDescriptionEn,
      dropDownDescriptionNp: values.dropDownDescriptionNp,
      id: values.id,
      isActive: true,
      listOfDropDownDetailRequestDto,
    } as IDropdownConfigInitialValue
    createDropDownConfig(reqData, {
      onSuccess: () => {
        setDropdownInitialValueState(dropdownConfigInitialValue)
        navigateToList()
      },
    })
  }

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={dropdownInitialValueState}
      validationSchema={dropdownConfigSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        handleSaveDropDown(values)
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
            <SectionHeader
              title={t('masterSetup.dropdownConfig.addDropDown')}
              backAction={navigateToList}
            />
            <ContainerLayout className="scrollbars grow">
              <form>
                <Grid sm={'sm:grid-cols-12'} gap="gap-4">
                  <Grid.Col sm={'sm:col-span-3'}>
                    <Form.Input
                      isRequired
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
                      isRequired
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
                          <Grid sm="sm:grid-cols-12" gap="gap-4">
                            {values?.listOfDropDownDetailRequestDto?.map(
                              (
                                dropDownDetailRequest,
                                index,
                                currDropDownList
                              ) => (
                                <Grid.Col sm="sm:col-span-6" className="h-full">
                                  <Card className="relative h-full">
                                    <Box className="ml-auto">
                                      <Dropdown
                                        triggerElement={
                                          <Icon
                                            icon={DotsThreeOutlineVertical}
                                            size={20}
                                          />
                                        }
                                      >
                                        {currDropDownList.length < 4 && (
                                          <Dropdown.DropdownMenuItem
                                            onClick={() => {
                                              arrayHelpers.push({
                                                descriptionEn: '',
                                                descriptionNp: '',
                                                isActive: true,
                                              })
                                            }}
                                            className="cursor-pointer hover:bg-red-88"
                                          >
                                            <Flexbox
                                              align="center"
                                              className="text-primary"
                                            >
                                              <Icon
                                                icon={Plus}
                                                className="mr-2"
                                              />
                                              <Text>
                                                {t(
                                                  'masterSetup.dropdownConfig.addmore'
                                                )}
                                              </Text>
                                            </Flexbox>
                                          </Dropdown.DropdownMenuItem>
                                        )}
                                        {currDropDownList.length !== 1 && (
                                          <Dropdown.DropdownMenuItem
                                            onClick={() => {
                                              arrayHelpers.remove(index)
                                            }}
                                            className="cursor-pointer hover:bg-red-88"
                                          >
                                            <Flexbox
                                              align="center"
                                              className="text-red-600"
                                            >
                                              <Icon
                                                icon={Trash}
                                                className="mr-2"
                                              />
                                              <Text>
                                                {t(
                                                  'masterSetup.dropdownConfig.remove'
                                                )}
                                              </Text>
                                            </Flexbox>
                                          </Dropdown.DropdownMenuItem>
                                        )}
                                      </Dropdown>
                                    </Box>
                                    <Grid
                                      className="mb-4"
                                      key={`dropDownDetailRequest-${index}`}
                                      sm={'sm:grid-cols-12'}
                                      gap="gap-4"
                                    >
                                      <Grid.Col sm={'sm:col-span-5'}>
                                        <Form.Input
                                          isRequired
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
                                            values
                                              .listOfDropDownDetailRequestDto[
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

                                      <Grid.Col sm={'sm:col-span-5'}>
                                        <Form.Input
                                          isRequired
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
                                            values
                                              .listOfDropDownDetailRequestDto[
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

                                      <FieldArray
                                        name={`listOfDropDownDetailRequestDto[${index}].fieldValues`}
                                        render={(
                                          nestedDropDownDetails: ArrayHelpers
                                        ) => {
                                          return (
                                            <>
                                              {!values
                                                ?.listOfDropDownDetailRequestDto[
                                                index
                                              ]?.fieldValues?.length && (
                                                <Grid.Col sm="sm:col-span-12">
                                                  <span
                                                    className="flex cursor-pointer items-center text-primary hover:opacity-50"
                                                    onClick={() => {
                                                      nestedDropDownDetails.push(
                                                        {
                                                          field: '',
                                                          value: '',
                                                        }
                                                      )
                                                    }}
                                                  >
                                                    <Icon
                                                      icon={Plus}
                                                      className="mr-2"
                                                    />
                                                    {t(
                                                      'masterSetup.dropdownConfig.addExtraDescription'
                                                    )}
                                                  </span>
                                                </Grid.Col>
                                              )}

                                              {values?.listOfDropDownDetailRequestDto[
                                                index
                                              ]?.fieldValues?.map(
                                                (
                                                  fieldVal,
                                                  fieldIndex,
                                                  allFields
                                                ) => (
                                                  <Grid.Col sm="sm:col-span-12">
                                                    <Grid
                                                      sm={'sm:grid-cols-12'}
                                                      gap="gap-4"
                                                    >
                                                      <Grid.Col
                                                        sm={'sm:col-span-5'}
                                                      >
                                                        <Form.Input
                                                          value={
                                                            values
                                                              .listOfDropDownDetailRequestDto[
                                                              index
                                                            ]?.fieldValues?.[
                                                              fieldIndex
                                                            ].field || ''
                                                          }
                                                          id={`listOfDropDownDetailRequestDto[${index}].fieldValues[${fieldIndex}].field`}
                                                          name={`listOfDropDownDetailRequestDto[${index}].fieldValues[${fieldIndex}].field`}
                                                          onChange={
                                                            handleChange
                                                          }
                                                          errors={errors}
                                                          onBlur={handleBlur}
                                                          touched={touched}
                                                        />
                                                      </Grid.Col>

                                                      <Grid.Col
                                                        sm={'sm:col-span-5'}
                                                      >
                                                        <Form.Input
                                                          value={
                                                            values
                                                              .listOfDropDownDetailRequestDto[
                                                              index
                                                            ]?.fieldValues?.[
                                                              fieldIndex
                                                            ].value || ''
                                                          }
                                                          id={`listOfDropDownDetailRequestDto[${index}].fieldValues[${fieldIndex}].value`}
                                                          name={`listOfDropDownDetailRequestDto[${index}].fieldValues[${fieldIndex}].value`}
                                                          onChange={
                                                            handleChange
                                                          }
                                                          errors={errors}
                                                          onBlur={handleBlur}
                                                          touched={touched}
                                                        />
                                                      </Grid.Col>

                                                      <Grid.Col>
                                                        <Flexbox
                                                          align="center"
                                                          className="mt-1"
                                                        >
                                                          <Button
                                                            type="button"
                                                            className="mr-2"
                                                            size="sm"
                                                            variant="danger"
                                                            onClick={() => {
                                                              nestedDropDownDetails.remove(
                                                                fieldIndex
                                                              )
                                                            }}
                                                          >
                                                            <Icon
                                                              icon={Trash}
                                                            />
                                                          </Button>
                                                          {fieldIndex + 1 ===
                                                            allFields.length &&
                                                            fieldIndex < 3 && (
                                                              <Button
                                                                type="button"
                                                                size="sm"
                                                                onClick={() => {
                                                                  nestedDropDownDetails.push(
                                                                    {
                                                                      field: '',
                                                                      value: '',
                                                                    }
                                                                  )
                                                                }}
                                                              >
                                                                <Icon
                                                                  icon={Plus}
                                                                />
                                                              </Button>
                                                            )}
                                                        </Flexbox>
                                                      </Grid.Col>
                                                    </Grid>
                                                  </Grid.Col>
                                                )
                                              )}
                                            </>
                                          )
                                        }}
                                      />
                                    </Grid>
                                  </Card>
                                </Grid.Col>
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
                          </Grid>
                        )
                      }}
                    />
                  </Grid.Col>
                </Grid>
              </form>
            </ContainerLayout>

            <Box className="w-full border-2 pb-10 text-right">
              <Flexbox align="center" justify="flex-end" className="px-16 py-6">
                <div>
                  <Button
                    type="button"
                    btnType="outlined"
                    variant="secondary"
                    className="mr-3"
                    onClick={navigateToList}
                  >
                    {t('btns.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                    className="ml-auto"
                  >
                    {dropdownId ? t('btns.update') : t('btns.save')}
                  </Button>
                </div>
              </Flexbox>
            </Box>
          </>
        )
      }}
    </Formik>
  )
}

export default AddDropDownConfig
