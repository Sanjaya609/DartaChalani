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
}: {
  toggleRecommendationForm: VoidFunction
  openRecommendationForm: boolean
  editId?: number
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
      const { id, recommendationNameEn, recommendationNameNp, isActive } =
        recommendationDetails
      setInitialRecommendationValue({
        id,
        recommendationNameEn,
        recommendationNameNp,
        isActive,
      })
    }
  }, [recommendationDetails, editId])

  const handleAddRecommendation = (values: IAddRecommendationInitialValue) => {
    const { recommendationNameEn, recommendationNameNp, id, isActive } = values

    const reqData: IAddRecommendationPayload = {
      id: id || undefined,
      recommendationNameEn,
      recommendationNameNp,
      isActive: editId ? isActive : true,
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
          },
        }}
      >
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                isRequired
                value={values.recommendationNameEn}
                errors={errors}
                touched={touched}
                name="recommendationNameEn"
                label={t('recommendation.recommendationNameEn')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                isNepali
                isRequired
                value={values.recommendationNameNp}
                errors={errors}
                touched={touched}
                name="recommendationNameNp"
                label={t('recommendation.recommendationNameNp')}
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
