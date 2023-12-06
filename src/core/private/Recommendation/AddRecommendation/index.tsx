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
import { useGetAllActiveSector } from '../../MasterSetup/Sector/services/sector.query'
import {
  IAddRecommendationInitialValue,
  IAddRecommendationPayload,
} from './schema/add-recommendation.interface'
import {
  addRecommendationInitialValues,
  addRecommendationValidationSchema,
} from './schema/add-recommendation.schema'
import {
  useCreateRegistrationBook,
  useGetRegistrationBookDetailById,
} from './services/add-recommendation.query'
import { IRoutePrivilege } from '@/router/routes/create-route'

const AddRegistrationBook = (props: Partial<IRoutePrivilege>) => {
  debugger
  const { currentModuleDetails } = props

  const { t } = useTranslation()
  const [wardOption, setWardOption] = useState<OptionType[]>([])
  const [initialRegistrationBookValue, setInitialRegistrationBookValue] =
    useState(addRecommendationInitialValues)
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
    useGetAllActiveSector<OptionType[]>({
      mapDatatoStyleSelect: true,
    })

  useEffect(() => {
    if (registrationBookDetails) {
      const { id, remarks } = registrationBookDetails
      setInitialRegistrationBookValue({
        id,

        remarks,
      })
    }
  }, [registrationBookDetails])

  const navigateToBookList = () => {
    navigate(privateRoutePath.registrationBook.base)
  }

  const handleAddRegistrationBook = (
    values: IAddRecommendationInitialValue
  ) => {
    if (!isAllRequiredDocumentUploaded) {
      return toast({
        type: ToastType.error,
        message: t('document.uploadAllDoc'),
      })
    }

    const { remarks, id } = values

    const reqData: IAddRecommendationPayload = {
      remarks,
      documents: uploadedDocumentData,
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
    validationSchema: addRecommendationValidationSchema,
    onSubmit: (values) => {
      handleAddRegistrationBook(values)
    },
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
