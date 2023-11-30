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
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useAuth } from '@/providers'
import { privateRoutePath, useNavigate, useParams } from '@/router'
import { apiDetails } from '@/service/api'
import { decodeParams } from '@/utility/route-params'
import { generateWardOption } from '@/utility/utility'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILocalBodyList } from '../../MasterSetup/Location/schema/location.interface'
import {
  useGetAllDistrictByProvinceId,
  useGetAllLocalBodyByDistrictId,
  useGetAllProvince,
} from '../../MasterSetup/Location/services/location.query'
import {
  IAddDispatchBookInitialValue,
  IAddDispatchBookPayload,
} from './schema/add-dispatch-book.interface'
import {
  addDispatchBookInitialValues,
  addDispatchBookValidationSchema,
} from './schema/add-dispatch-book.schema'
import {
  useCreateDispatchBook,
  useGetDispatchBookDetailById,
  useGetDispatchNumberByFiscalYearId,
} from './services/add-dispatch-book.query'
import { IRoutePrivilege } from '@/router/routes/create-route'

const AddDispatchBook = (props: Partial<IRoutePrivilege>) => {
  const { currentModuleDetails } = props
  const { t } = useTranslation()
  const [wardOption, setWardOption] = useState<OptionType[]>([])
  const { initData } = useAuth()

  const [initialRegistrationBookValue, setInitialRegistrationBookValue] =
    useState<IAddDispatchBookInitialValue>({
      ...addDispatchBookInitialValues,
      letterNumber: initData?.currentFiscalYear?.id || '',
    })
  const [isAllRequiredDocumentUploaded, setIsAllRequiredDocumentUploaded] =
    useState(false)
  const [uploadedDocumentData, setUploadedDocumentData] = useState<
    IDocumentPayload[]
  >([])

  const navigate = useNavigate()
  const params = useParams()
  const dispatchBookId = decodeParams<string>(params?.id)

  const { mutate: createRegistrationBook } = useCreateDispatchBook()

  const { data: dispatchBookDetails } =
    useGetDispatchBookDetailById(dispatchBookId)

  const { data: provinceList = [], isFetching: provinceListFetching } =
    useGetAllProvince<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  useGetDispatchNumberByFiscalYearId(
    !dispatchBookId ? initData?.currentFiscalYear.id || '' : '',
    setInitialRegistrationBookValue
  )

  useEffect(() => {
    if (dispatchBookDetails) {
      const {
        id,
        letterNumber,
        dispatchNumber,
        letterDate,
        subjectOfLetter,
        letterReceiverName,
        letterReceiverEmail,
        letterReceiverAddress,
        letterCarrierName,
        letterCarrierContact,
        letterToSection,
        physicalFileLocation,
        remarks,
        wardNumber,
        locationDataResponse: {
          districtId,
          localBodyId,
          provinceId,
          totalWards,
        },
      } = dispatchBookDetails
      setInitialRegistrationBookValue({
        id,
        letterNumber,
        dispatchNumber,
        letterDate,
        subjectOfLetter,
        letterReceiverName,
        letterReceiverEmail,
        letterReceiverAddress,
        letterCarrierName,
        letterCarrierContact,
        letterToSection,
        physicalFileLocation,
        wardNumber,
        remarks,
        localBodyId,
        districtId,
        provinceId,
      })

      setWardOption(generateWardOption(+totalWards))
    }
  }, [dispatchBookDetails])

  const navigateToBookList = () => {
    navigate(privateRoutePath.dispatchBook.base)
  }

  const handleAddDispatchBook = (values: IAddDispatchBookInitialValue) => {
    if (!isAllRequiredDocumentUploaded) {
      return toast({
        type: ToastType.error,
        message: t('document.uploadAllDoc'),
      })
    }

    const {
      letterNumber,
      dispatchNumber,
      letterDate,
      subjectOfLetter,
      letterReceiverName,
      letterReceiverEmail,
      letterReceiverAddress,
      letterCarrierName,
      letterCarrierContact,
      letterToSection,
      physicalFileLocation,
      remarks,
      localBodyId,
      wardNumber,
      id,
    } = values

    const reqData: IAddDispatchBookPayload = {
      letterNumber,
      dispatchNumber,
      letterDate,
      subjectOfLetter,
      letterReceiverName,
      letterReceiverEmail,
      letterReceiverAddress,
      letterCarrierName,
      letterCarrierContact,
      letterToSection,
      physicalFileLocation,
      remarks,
      localBodyId,
      wardNumber,
      id: id || undefined,
      documents: uploadedDocumentData,
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
    validationSchema: addDispatchBookValidationSchema,
    onSubmit: (values) => {
      handleAddDispatchBook(values)
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
        title={t('dispatchBook.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            {dispatchBookDetails?.dispatchDate && (
              <Grid.Col sm={'sm:col-span-3'}>
                <Form.NepaliDatePicker
                  disabled
                  value={dispatchBookDetails.dispatchDate}
                  errors={errors}
                  touched={touched}
                  name="dispatchDate"
                  label={t('dispatchBook.dispatchDate')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid.Col>
            )}

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values?.dispatchNumber}
                errors={errors}
                touched={touched}
                name="dispatchNumber"
                label={t('dispatchBook.dispatchNumber')}
                // onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
              <Text variant="h5" typeface="semibold">
                {t('dispatchBook.letterDetails')}
              </Text>
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={
                  dispatchBookId
                    ? values?.letterNumber
                    : getTextByLanguage(
                        initData?.currentFiscalYear?.fiscalYearNameEn || '',
                        initData?.currentFiscalYear?.fiscalYearNameNp || ''
                      )
                }
                errors={errors}
                touched={touched}
                name="letterNumber"
                label={t('dispatchBook.letterNumber')}
                disabled
                isRequired
                // onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                isRequired
                disabled={!!dispatchBookId}
                value={values.letterDate}
                errors={errors}
                touched={touched}
                name="letterDate"
                label={t('dispatchBook.letterDate')}
                onChange={(nepDate) => {
                  setFieldValue('letterDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
              <Form.Input
                isRequired
                value={values.subjectOfLetter}
                errors={errors}
                touched={touched}
                name="subjectOfLetter"
                label={t('dispatchBook.subjectOfLetter')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.letterReceiverName}
                errors={errors}
                touched={touched}
                name="letterReceiverName"
                label={t('dispatchBook.letterReceiverName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.letterReceiverEmail}
                errors={errors}
                touched={touched}
                name="letterReceiverEmail"
                label={t('dispatchBook.letterReceiverEmail')}
                onBlur={handleBlur}
                onChange={(e) => {
                  setFieldValue(
                    'letterReceiverEmail',
                    e.target.value.replace(/\s/g, '')
                  )
                }}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterReceiverAddress}
                errors={errors}
                touched={touched}
                isRequired
                name="letterReceiverAddress"
                label={t('dispatchBook.letterReceiverAddress')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterCarrierName}
                errors={errors}
                touched={touched}
                isRequired
                name="letterCarrierName"
                label={t('dispatchBook.letterCarrierName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterCarrierContact}
                errors={errors}
                touched={touched}
                isRequired
                name="letterCarrierContact"
                label={t('dispatchBook.letterCarrierContact')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.physicalFileLocation}
                errors={errors}
                touched={touched}
                isRequired
                name="physicalFileLocation"
                label={t('dispatchBook.physicalFileLocation')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.letterToSection}
                errors={errors}
                touched={touched}
                name="letterToSection"
                label={t('dispatchBook.letterToSection')}
                onChange={handleChange}
                onBlur={handleBlur}
                isRequired
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.TextArea
                isRequired
                value={values.remarks}
                errors={errors}
                touched={touched}
                name="remarks"
                label={t('dispatchBook.remarks')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
              <Text variant="h5" typeface="semibold">
                {t('dispatchBook.locationDetails')}
              </Text>
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                isRequired
                options={provinceList}
                isLoading={provinceListFetching}
                calculateValueOnChange
                value={values.provinceId}
                errors={errors}
                touched={touched}
                name="provinceId"
                label={t('dispatchBook.provinceId')}
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
                isRequired
                options={districtList}
                isLoading={districtListFetching}
                calculateValueOnChange
                value={values.districtId}
                errors={errors}
                touched={touched}
                name="districtId"
                label={t('dispatchBook.districtId')}
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
                isRequired
                options={localBodyList}
                isLoading={localBodyListFetching}
                calculateValueOnChange
                value={values.localBodyId}
                errors={errors}
                touched={touched}
                name="localBodyId"
                label={t('dispatchBook.localBodyId')}
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
                isRequired
                options={wardOption}
                isLoading={localBodyListFetching}
                calculateValueOnChange
                value={values.wardNumber}
                errors={errors}
                touched={touched}
                name="wardNumber"
                label={t('dispatchBook.wardNumber')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
          </Grid>
        </form>

        <DocumentsUpload
          moduleId={currentModuleDetails?.id || ''}
          canUploadMultipleFile
          setIsAllRequiredDocumentUploaded={setIsAllRequiredDocumentUploaded}
          setUploadedDocumentData={setUploadedDocumentData}
          documentList={dispatchBookDetails?.documentList}
          viewControllerName={
            apiDetails.downloadDocumentForDispatchBook.controllerName
          }
          deleteAPIDetails={apiDetails.deleteDocumentForDispatchBook}
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
            {dispatchBookId ? t('btns.update') : t('btns.save')}
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default AddDispatchBook
