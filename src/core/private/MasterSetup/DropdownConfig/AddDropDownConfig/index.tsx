import Form from '@/components/functional/Form/Form'
import { FormikValidationError } from '@/components/functional/Form/InputErrorMessage/InputErrorMessage'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Flexbox, Grid, Icon } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { privateRoutePath, useNavigate } from '@/router'
import { ArrayHelpers, FieldArray, Formik } from 'formik'
import { DotsThreeOutlineVertical, Plus, Trash } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { useCreateDropdownConfig } from '../services/dropdown-config.query'
import { IDropdownConfigInitialValue } from './schema/dropdown-config.interface'
import {
  dropdownConfigInitialValue,
  dropdownConfigSchema,
  IDropdownFieldConfigInitialValue,
} from './schema/dropdown-config.schema'

const AddDropDownConfig = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToList = () => {
    navigate(privateRoutePath.masterSetup.dropdownConfig.base)
  }

  const { mutate: createDropDownConfig } = useCreateDropdownConfig()

  const handleSaveDropDown = (values: IDropdownFieldConfigInitialValue) => {
    const listOfDropDownDetailRequestDto =
      values?.listOfDropDownDetailRequestDto?.map((list) => {
        const mappedFieldsVal = list.fieldValues?.reduce(
          (accField, currField, index) => {
            const mappedField = {
              ...accField,

              [`field-${index + 1}`]: currField.field,
              [`value-${index + 1}`]: currField.value,
            }

            return mappedField
          },
          {}
        )
        return {
          ...(list.dropDownId && { dropDownId: list.dropDownId }),
          ...(list.id && { dropDownId: list.id }),
          descriptionEn: list.descriptionEn,
          descriptionNp: list.descriptionNp,
          ...mappedFieldsVal,
        }
      })

    const reqData = {
      dropDownDescriptionEn: values.dropDownDescriptionEn,
      dropDownDescriptionNp: values.dropDownDescriptionNp,
      id: 0,
      isActive: true,
      listOfDropDownDetailRequestDto,
    } as IDropdownConfigInitialValue
    createDropDownConfig(reqData)
  }

  return (
    <Formik
      validateOnChange
      enableReinitialize
      initialValues={dropdownConfigInitialValue}
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
                                <Grid.Col sm="sm:col-span-6">
                                  <Card className="relative">
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
                                            <Flexbox align="center">
                                              <Icon
                                                icon={Plus}
                                                className="mr-2"
                                              />
                                              <Text>Add More</Text>
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
                                            <Flexbox align="center">
                                              <Icon
                                                icon={Trash}
                                                className="mr-2"
                                              />
                                              <Text>Delete</Text>
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
                                                    className="flex cursor-pointer items-center hover:opacity-50"
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
                                                    />{' '}
                                                    Add Extra Description
                                                  </span>
                                                </Grid.Col>
                                              )}

                                              {values?.listOfDropDownDetailRequestDto[
                                                index
                                              ]?.fieldValues?.map(
                                                (fieldVal, fieldIndex) => (
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
                                                            <Icon icon={Plus} />
                                                          </Button>
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
                <Button
                  type="submit"
                  onClick={() => {
                    handleSubmit()
                  }}
                  className="ml-auto"
                >
                  {t('btns.save')}
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
