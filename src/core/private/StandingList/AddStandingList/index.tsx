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
import { useGetAllActiveServiceType } from '../../MasterSetup/ServiceType/services/servicetype.query'
import {
  IStandingListInitialValue,
  IStandingListPayload,
} from './schema/standing-list.interface'
import {
  addStandingListInitialValues,
  addStandingListValidationSchema,
} from './schema/standing-list.schema'
import {
  useCreateStandingList,
  useGetStandingListDetailById,
} from './services/standing-list.query'
import { IRoutePrivilege } from '@/router/routes/create-route'
import { inputChangeNumberOnly } from '@/utility/inputUtils/input-change-utils'
import { useAuth } from '@/providers'
import { getTextByLanguage } from '@/lib/i18n/i18n'

const StandingList = (props: Partial<IRoutePrivilege>) => {
  const { currentModuleDetails } = props
  const { t } = useTranslation()
  const { initData } = useAuth()

  const [wardOption, setWardOption] = useState<OptionType[]>([])
  const [initialRegistrationBookValue, setInitialRegistrationBookValue] =
    useState({
      ...addStandingListInitialValues,
      letter_no: initData?.currentFiscalYear?.id || '',
    })
  const [isAllRequiredDocumentUploaded, setIsAllRequiredDocumentUploaded] =
    useState(false)
  const [uploadedDocumentData, setUploadedDocumentData] = useState<
    IDocumentPayload[]
  >([])

  const navigate = useNavigate()
  const params = useParams()
  const standingBookId = decodeParams<string>(params?.id)

  const { mutate: createStandingList } = useCreateStandingList()

  const { data: registrationBookDetails } =
    useGetStandingListDetailById(standingBookId)

  const { data: provinceList = [], isFetching: provinceListFetching } =
    useGetAllProvince<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  const { data: serviceTypeList = [], isFetching: serviceTypeListFetching } =
    useGetAllActiveServiceType<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  useEffect(() => {
    if (registrationBookDetails) {
      const {
        id,
        applicationDate,
        address,
        contactNumber,
        contactPersonName,
        firmRegistrationNumber,
        locationDataResponse: {
          localBodyId,
          provinceId,
          districtId,
          totalWards,
        },
        letter_no,
        letter_noNp,
        panOrVatNumber,
        serviceTypeId,
        panOrVatRegistrationDate,
        wardNumber,
        personOrFirmName,
        registrationDate,
        taxClearanceDate,
        taxClearanceDateExtendedDate,
        workingSectorDetails,
      } = registrationBookDetails
      setInitialRegistrationBookValue({
        applicationDate,
        address,
        contactNumber,
        contactPersonName,
        firmRegistrationNumber,
        localBodyId,
        letter_no,
        letter_noNp,
        panOrVatNumber,
        serviceTypeId,
        panOrVatRegistrationDate,
        wardNumber,
        provinceId,
        districtId,
        personOrFirmName,
        registrationDate,
        taxClearanceDate,
        taxClearanceDateExtendedDate,
        workingSectorDetails,
        id,
      })
      setWardOption(generateWardOption(+totalWards))
    }
  }, [registrationBookDetails])

  const navigateToBookList = () => {
    navigate(privateRoutePath.standingList.base)
  }

  const handleAddRegistrationBook = (values: IStandingListInitialValue) => {
    if (!isAllRequiredDocumentUploaded) {
      return toast({
        type: ToastType.error,
        message: t('document.uploadAllDoc'),
      })
    }

    const {
      // applicationDate,
      address,
      contactNumber,
      contactPersonName,
      firmRegistrationNumber,
      id,
      letter_no,
      letter_noNp,
      localBodyId,
      panOrVatNumber,
      panOrVatRegistrationDate,
      personOrFirmName,
      // registrationDate,
      serviceTypeId,
      taxClearanceDate,
      taxClearanceDateExtendedDate,
      wardNumber,
      workingSectorDetails,
    } = values

    const reqData: IStandingListPayload = {
      // applicationDate,
      wardNumber,
      documents: uploadedDocumentData,
      moduleId: currentModuleDetails?.id,
      id: id || undefined,
      address,
      contactNumber,
      contactPersonName,
      firmRegistrationNumber,
      letter_no,
      letter_noNp,
      localBodyId,
      panOrVatNumber,
      panOrVatRegistrationDate,
      personOrFirmName,
      // registrationDate,
      serviceTypeId,
      taxClearanceDate,
      taxClearanceDateExtendedDate,
      workingSectorDetails,
    }

    if (standingBookId) {
      delete reqData.letter_no
      delete reqData.letter_noNp
    }

    createStandingList(reqData, {
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
    validationSchema: addStandingListValidationSchema,
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
        title={t('standingList.title')}
        backAction={navigateToBookList}
      />
      <ContainerLayout className="scrollbars grow ">
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                isRequired
                disabled
                value={values.applicationDate}
                errors={errors}
                touched={touched}
                name="applicationDate"
                label={t('standingList.applicationDate')}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={
                  standingBookId
                    ? getTextByLanguage(
                        values?.letter_no.toString(),
                        values?.letter_noNp?.toString()!
                      )
                    : getTextByLanguage(
                        initData?.currentFiscalYear?.fiscalYearNameEn || '',
                        initData?.currentFiscalYear?.fiscalYearNameNp || ''
                      )
                }
                errors={errors}
                touched={touched}
                name="letter_no"
                label={t('standingList.letter_no')}
                // onChange={handleChange}
                disabled
                onBlur={handleBlur}
              />
            </Grid.Col>{' '}
            <Grid.Col sm={'sm:col-span-12'} className="mt-3">
              <Text variant="h5" typeface="semibold">
                {t('standingList.firmDetails')}
              </Text>
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Select
                isRequired
                options={serviceTypeList}
                isLoading={serviceTypeListFetching}
                calculateValueOnChange
                value={values.serviceTypeId}
                errors={errors}
                touched={touched}
                name="serviceTypeId"
                label={t('standingList.serviceTypeId')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.personOrFirmName}
                errors={errors}
                touched={touched}
                name="personOrFirmName"
                label={t('standingList.personOrFirmName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.firmRegistrationNumber}
                errors={errors}
                touched={touched}
                name="firmRegistrationNumber"
                label={t('standingList.firmRegistrationNumber')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                value={values.registrationDate}
                errors={errors}
                touched={touched}
                name="registrationDate"
                label={t('standingList.registrationDate')}
                onChange={(nepDate) => {
                  setFieldValue('registrationDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.panOrVatNumber}
                errors={errors}
                touched={touched}
                name="panOrVatNumber"
                label={t('standingList.panOrVatNumber')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                isRequired
                value={values.panOrVatRegistrationDate}
                errors={errors}
                touched={touched}
                name="panOrVatRegistrationDate"
                label={t('standingList.panOrVatRegistrationDate')}
                onChange={(nepDate) => {
                  setFieldValue('panOrVatRegistrationDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.contactPersonName}
                errors={errors}
                touched={touched}
                name="contactPersonName"
                label={t('standingList.contactPersonName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                isRequired
                value={values.contactNumber}
                errors={errors}
                touched={touched}
                name="contactNumber"
                label={t('standingList.contactNumber')}
                onChange={(event) => {
                  inputChangeNumberOnly({
                    event,
                    handleChange,
                  })
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                value={values.taxClearanceDate}
                errors={errors}
                touched={touched}
                name="taxClearanceDate"
                label={t('standingList.taxClearanceDate')}
                onChange={(nepDate) => {
                  setFieldValue('taxClearanceDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.NepaliDatePicker
                value={values.taxClearanceDateExtendedDate}
                errors={errors}
                touched={touched}
                name="taxClearanceDateExtendedDate"
                label={t('standingList.taxClearanceDateExtendedDate')}
                onChange={(nepDate) => {
                  setFieldValue('taxClearanceDateExtendedDate', nepDate)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-6'}>
              <Form.TextArea
                value={values.workingSectorDetails}
                errors={errors}
                touched={touched}
                name="workingSectorDetails"
                label={t('standingList.workingSectorDetails')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-12'}>
              <Text variant="h5" typeface="semibold">
                {t('standingList.locationDetails')}
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
                label={t('standingList.provinceId')}
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
                label={t('standingList.districtId')}
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
                label={t('standingList.localBodyId')}
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
                label={t('standingList.wardNumber')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main)
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
            <Grid.Col sm={'sm:col-span-3'}>
              <Form.Input
                value={values.address}
                errors={errors}
                touched={touched}
                name="address"
                label={t('standingList.address')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
          </Grid>
        </form>

        {currentModuleDetails?.id && (
          <DocumentsUpload
            className="mt-6"
            title={t('document.necessaryDoc')}
            moduleId={currentModuleDetails.id}
            canUploadMultipleFile
            setIsAllRequiredDocumentUploaded={setIsAllRequiredDocumentUploaded}
            setUploadedDocumentData={setUploadedDocumentData}
            documentList={registrationBookDetails?.documentList}
            viewControllerName={
              apiDetails.downloadDocumentForStandingList.controllerName
            }
            deleteAPIDetails={apiDetails.deleteDocumentForStandingList}
          />
        )}
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
            {standingBookId ? t('btns.update') : t('btns.save')}
          </Button>
        </ContainerLayout>
      </Box>
    </>
  )
}

export default StandingList
