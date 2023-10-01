import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import DocumentsUpload from '@/components/functional/Documents/DocumentsUpload'
import Form from '@/components/functional/Form/Form'
import SectionHeader from '@/components/functional/SectionHeader'
import { Box, Button, Grid, Layout } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { generateWardOption } from '@/utility/utility'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILocalBodyList } from '../../MasterSetup/Location/schema/location.interface'
import {
  useGetAllProvince,
  useGetAllDistrictByProvinceId,
  useGetAllLocalBodyByDistrictId,
} from '../../MasterSetup/Location/services/location.query'
import { useGetAllSector } from '../../MasterSetup/Sector/services/sector.query'
import {
  addRegistrationBookInitialValues,
  addRegistrationBookValidationSchema,
} from './schema/add-registration-book.schema'

const AddRegistrationBook = () => {
  const { t } = useTranslation()

  const [wardOption, setWardOption] = useState<OptionType[]>([])

  const { data: provinceList = [], isFetching: provinceListFetching } =
    useGetAllProvince<OptionType[]>({
      mapDatatoStyleSelect: true,
    })
  const { data: sectorList = [], isFetching: sectorListFetching } =
    useGetAllSector<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: addRegistrationBookInitialValues,
    enableReinitialize: true,
    validationSchema: addRegistrationBookValidationSchema,
    onSubmit: (value) => {
      // mutate(
      //   {
      //     ...value,
      //     maxFileSize: +values.maxFileSize,
      //   },
      //   { onSuccess: () => resetFormValues() }
      // )
    },
  })

  const { data: districtList = [], isFetching: districtListFetching } =
    useGetAllDistrictByProvinceId<OptionType[]>(values?.provinceId, {
      mapDatatoStyleSelect: true,
    })

  const { data: localBodyList = [], isFetching: localBodyListFetching } =
    useGetAllLocalBodyByDistrictId<OptionType[]>(values?.districtId, {
      mapDatatoStyleSelect: true,
    })

  return (
    <>
      <SectionHeader title={t('registrationBook.title')} />
      <ContainerLayout className="scrollbars grow pb-4">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                disabled
                value={ADToBS(values.applicationDate)}
                errors={errors}
                touched={touched}
                name="applicationDate"
                label={t('registrationBook.applicationDate')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.registrationNumber}
                errors={errors}
                touched={touched}
                name="registrationNumber"
                label={t('registrationBook.registrationNumber')}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                options={provinceList}
                isLoading={provinceListFetching}
                calculateValueOnChange
                value={values.provinceId}
                errors={errors}
                touched={touched}
                name="provinceId"
                label={t('registrationBook.provinceId')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                  if (!event.main) {
                    setFieldValue('districtId', '')
                    setFieldValue('localBodyId', '')
                    setFieldValue('wardNumber', '')
                    setWardOption([])
                  }
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                options={districtList}
                isLoading={districtListFetching}
                calculateValueOnChange
                value={values.districtId}
                errors={errors}
                touched={touched}
                name="districtId"
                label={t('registrationBook.districtId')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                  if (!event.main) {
                    setFieldValue('localBodyId', '')
                  }
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                options={localBodyList}
                isLoading={localBodyListFetching}
                calculateValueOnChange
                value={values.localBodyId}
                errors={errors}
                touched={touched}
                name="localBodyId"
                label={t('registrationBook.localBodyId')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                  if (event.main) {
                    setWardOption(
                      generateWardOption(
                        (event.value as unknown as ILocalBodyList).totalWards
                      )
                    )
                  } else {
                    setFieldValue('wardNumber', '')
                    setWardOption([])
                  }
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                options={wardOption}
                isLoading={localBodyListFetching}
                calculateValueOnChange
                value={values.wardNumber}
                errors={errors}
                touched={touched}
                name="wardNumber"
                label={t('registrationBook.wardNumber')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
              <Text variant="h5" typeface="semibold">
                Letter Details
              </Text>
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                value={values.letterDispatchDate}
                errors={errors}
                touched={touched}
                name="letterDispatchDate"
                label={t('registrationBook.letterDispatchDate')}
                onChange={(nepDate) => {
                  setFieldValue('letterDispatchDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterDispatchNumber}
                errors={errors}
                touched={touched}
                name="letterDispatchNumber"
                label={t('registrationBook.letterDispatchNumber')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterLinks}
                errors={errors}
                touched={touched}
                name="letterLinks"
                label={t('registrationBook.letterLinks')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterSenderName}
                errors={errors}
                touched={touched}
                name="letterSenderName"
                label={t('registrationBook.letterSenderName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterToPerson}
                errors={errors}
                touched={touched}
                name="letterToPerson"
                label={t('registrationBook.letterToPerson')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.physicalAddress}
                errors={errors}
                touched={touched}
                name="physicalAddress"
                label={t('registrationBook.physicalAddress')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                options={sectorList}
                isLoading={sectorListFetching}
                calculateValueOnChange
                value={values.sectorId}
                errors={errors}
                touched={touched}
                name="sectorId"
                label={t('registrationBook.sectorId')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-12'}>
              <Form.Input
                value={values.subjectOfLetter}
                errors={errors}
                touched={touched}
                name="subjectOfLetter"
                label={t('registrationBook.subjectOfLetter')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.TextArea
                value={values.remarks}
                errors={errors}
                touched={touched}
                name="remarks"
                label={t('registrationBook.remarks')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
          </Grid>
        </form>

        <DocumentsUpload canUploadMultipleFile />
      </ContainerLayout>
      {/* </Layout.Absolute> */}

      <Box className="w-full border-2 pt-3 text-right">
        <ContainerLayout>
          <Button
            type="button"
            btnType="outlined"
            variant="secondary"
            className="mr-3"
          >
            {t('btns.cancel')}
          </Button>
          <Button onClick={() => handleSubmit()} className="ml-auto">
            Save
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default AddRegistrationBook
