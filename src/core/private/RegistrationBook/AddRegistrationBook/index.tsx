import { ADToBS } from '@/components/functional/Datepicker/dateConverter'
import DocumentsUpload from '@/components/functional/Documents/DocumentsUpload'
import { IDocumentPayload } from '@/components/functional/Documents/DocumentsUpload/document-upload.interface'
import Form from '@/components/functional/Form/Form'
import SectionHeader from '@/components/functional/SectionHeader'
import toast, {
  ToastType,
} from '@/components/functional/ToastNotifier/ToastNotifier'
import { Box, Button, Grid } from '@/components/ui'
import ContainerLayout from '@/components/ui/core/Layout/ContainerLayout'
import { Text } from '@/components/ui/core/Text'
import { privateRoutePath, useLocation, useNavigate, useParams } from '@/router'
import { decodeParams } from '@/utility/route-params'
import { generateWardOption } from '@/utility/utility'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILocalBodyList } from '../../MasterSetup/Location/schema/location.interface'
import {
  useGetAllProvince,
  useGetAllDistrictByProvinceId,
  useGetAllLocalBodyByDistrictId,
} from '../../MasterSetup/Location/services/location.query'
import { useGetAllSector } from '../../MasterSetup/Sector/services/sector.query'
import {
  IAddRegistrationBookInitialValue,
  IAddRegistrationBookPayload,
} from './schema/add-registration-book.interface'
import {
  addRegistrationBookInitialValues,
  addRegistrationBookValidationSchema,
} from './schema/add-registration-book.schema'
import {
  useCreateRegistrationBook,
  useGetRegistrationBookDetailById,
} from './services/add-registration-book.query'

const AddRegistrationBook = () => {
  const { t } = useTranslation()
  const [wardOption, setWardOption] = useState<OptionType[]>([])
  const [initialRegistrationBookValue, setInitialRegistrationBookValue] =
    useState(addRegistrationBookInitialValues)
  const [isAllRequiredDocumentUploaded, setIsAllRequiredDocumentUploaded] =
    useState(false)
  const [uploadedDocumentData, setUploadedDocumentData] = useState<
    IDocumentPayload[]
  >([])

  const navigate = useNavigate()
  const params = useParams()
  const registrationBookId = decodeParams<string>(params?.id)

  const { mutate: createRegistrationBook } = useCreateRegistrationBook()

  const { data: registrationBookDetails } =
    useGetRegistrationBookDetailById(registrationBookId)

  const { data: provinceList = [], isFetching: provinceListFetching } =
    useGetAllProvince<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  const { data: sectorList = [], isFetching: sectorListFetching } =
    useGetAllSector<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  useEffect(() => {
    if (registrationBookDetails) {
      const {
        id,
        letterDispatchDate,
        letterDispatchNumber,
        letterLinks,
        letterSenderName,
        letterToPerson,
        physicalAddress,
        remarks,
        sectorId,
        subjectOfLetter,
        wardNumber,
        locationDataResponse: {
          districtId,
          localBodyId,
          provinceId,
          totalWards,
        },
      } = registrationBookDetails
      setInitialRegistrationBookValue({
        id,
        letterDispatchDate,
        letterDispatchNumber,
        letterLinks,
        letterSenderName,
        letterToPerson,
        physicalAddress,
        remarks,
        sectorId,
        subjectOfLetter,
        wardNumber,
        localBodyId,
        districtId,
        provinceId,
      })

      setWardOption(generateWardOption(+totalWards))
    }
  }, [registrationBookDetails])

  const navigateToBookList = () => {
    navigate(privateRoutePath.registrationBook.base)
  }

  const handleAddRegistrationBook = (
    values: IAddRegistrationBookInitialValue
  ) => {
    if (!isAllRequiredDocumentUploaded) {
      return toast({
        type: ToastType.error,
        message: 'Please upload all required documents.',
      })
    }

    const {
      letterDispatchDate,
      letterDispatchNumber,
      letterLinks,
      letterSenderName,
      letterToPerson,
      localBodyId,
      physicalAddress,
      remarks,
      sectorId,
      subjectOfLetter,
      wardNumber,
      id,
    } = values

    const reqData: IAddRegistrationBookPayload = {
      letterDispatchDate,
      letterDispatchNumber,
      letterLinks,
      letterSenderName,
      letterToPerson,
      localBodyId,
      physicalAddress,
      remarks,
      sectorId,
      subjectOfLetter,
      wardNumber,
      documents: uploadedDocumentData,
      moduleId: 56,
      id: id || undefined,
    }

    createRegistrationBook(reqData, {
      onSuccess: () => {
        navigateToBookList()
      },
    })
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialRegistrationBookValue,
    enableReinitialize: true,
    validationSchema: addRegistrationBookValidationSchema,
    onSubmit: (values) => {
      handleAddRegistrationBook(values)
    },
  })

  const { data: districtList = [], isFetching: districtListFetching } =
    useGetAllDistrictByProvinceId<OptionType[]>(values?.provinceId || '', {
      mapDatatoStyleSelect: true,
    })

  const { data: localBodyList = [], isFetching: localBodyListFetching } =
    useGetAllLocalBodyByDistrictId<OptionType[]>(values?.districtId || '', {
      mapDatatoStyleSelect: true,
    })

  return (
    <>
      <SectionHeader
        title={t('registrationBook.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            {registrationBookDetails?.applicationDate && (
              <Grid.Col sm={'sm:col-span-3'}>
                <Form.NepaliDatePicker
                  disabled
                  value={registrationBookDetails.applicationDate}
                  errors={errors}
                  touched={touched}
                  name="applicationDate"
                  label={t('registrationBook.applicationDate')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid.Col>
            )}

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

        <DocumentsUpload
          moduleId={'56'}
          canUploadMultipleFile
          setIsAllRequiredDocumentUploaded={setIsAllRequiredDocumentUploaded}
          setUploadedDocumentData={setUploadedDocumentData}
        />
      </ContainerLayout>

      <Box className="mb-6 w-full border-2 pb-6 text-right">
        <ContainerLayout>
          <Button
            type="button"
            btnType="outlined"
            variant="secondary"
            className="mr-3"
            onClick={navigateToBookList}
          >
            {t('btns.cancel')}
          </Button>
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            className="ml-auto"
          >
            {registrationBookId ? t('btns.update') : t('btns.save')}
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default AddRegistrationBook
