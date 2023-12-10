import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IAddRecommendationInitialValue,
  IAddRecommendationPayload,
} from './schema/add-recommendation.interface'
import {
  addRecommendationInitialValues,
  addRecommendationValidationSchema,
} from './schema/add-recommendation.schema'
import {
  useCreateRecommendation,
  useGetRecommendationDetailById,
} from './services/add-recommendation.query'
import Modal from '@/components/ui/Modal/Modal'

const AddRecommendationForm = ({
  toggleRecommendationForm,
  openRecommendationForm,
  editId,
  viewOnly,
  setViewOnly,
}: {
  toggleRecommendationForm: VoidFunction
  openRecommendationForm: boolean
  editId?: number
  viewOnly?: boolean
  setViewOnly?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()
  const [initialRecommendationValue, setInitialRecommendationValue] = useState(
    addRecommendationInitialValues
  )

  const {
    mutate: createRecommendation,
    isLoading: createRecommendationLoading,
  } = useCreateRecommendation()

  const { data: recommendationDetails } = useGetRecommendationDetailById(
    editId ?? ''
  )

  useEffect(() => {
    if (recommendationDetails) {
      const { id, nameEnglish, nameNepali, description } = recommendationDetails
      setInitialRecommendationValue({
        id,
        nameEnglish,
        nameNepali,
        description,
      })
    }
  }, [recommendationDetails, editId])

  const handleAddRecommendation = (values: IAddRecommendationInitialValue) => {
    const { nameEnglish, nameNepali, id, description } = values

    const reqData: IAddRecommendationPayload = {
      id: id || undefined,
      nameEnglish,
      nameNepali,
      description,
    }

    createRecommendation(reqData, {
      onSuccess: () => {
        setInitialRecommendationValue(addRecommendationInitialValues)
        toggleRecommendationForm()
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
    initialValues: initialRecommendationValue,
    enableReinitialize: true,
    validationSchema: addRecommendationValidationSchema,
    onSubmit: (values) => {
      handleAddRecommendation(values)
    },
  })

  return (
    <>
      <Modal
        open={!!openRecommendationForm}
        toggleModal={() => {
          toggleRecommendationForm()
          setInitialRecommendationValue(addRecommendationInitialValues)
          setViewOnly && setViewOnly(false)
        }}
        size="md"
        title={
          editId
            ? t('recommendation.editRecommendation')
            : t('recommendation.addRecommendation')
        }
        saveBtnProps={{
          btnAction: handleSubmit,
          loading: createRecommendationLoading,
          btnTitle: t('btns.save'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            toggleRecommendationForm()
            loading: createRecommendationLoading
            setInitialRecommendationValue(addRecommendationInitialValues)
            setViewOnly && setViewOnly(false)
          },
        }}
      >
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
                isRequired
                value={values.nameEnglish}
                errors={errors}
                touched={touched}
                name="nameEnglish"
                label={t('recommendation.recommendationNameEn')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
                isNepali
                isRequired
                value={values.nameNepali}
                errors={errors}
                touched={touched}
                name="nameNepali"
                label={t('recommendation.recommendationNameNp')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-12'}>
              <Form.TextArea
                disabled={viewOnly}
                withCharacterCount
                maxLength={500}
                value={values.description}
                errors={errors}
                touched={touched}
                name="description"
                label={t('registrationBook.remarks')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </>
  )
}

export default AddRecommendationForm
