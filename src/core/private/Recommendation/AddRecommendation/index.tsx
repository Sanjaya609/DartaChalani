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
import { useGetUnConfigurableModuleList } from '../../Security/ModuleSetup/services/moduleSetup.query'

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

  // GET Module List for dropdown
  const {
    data: documentModuleNameOption = [],
    isFetching: moduleNameFetching,
  } = useGetUnConfigurableModuleList<OptionType[]>({
    mapDatatoStyleSelect: true,
  })

  const { data: recommendationDetails } = useGetRecommendationDetailById(
    editId ?? ''
  )

  const {
    mutate: createRecommendation,
    isLoading: createRecommendationLoading,
  } = useCreateRecommendation()

  const handleAddRecommendation = (values: IAddRecommendationInitialValue) => {
    const { nameEnglish, nameNepali, id, description, moduleId } = values

    const reqData: IAddRecommendationPayload = {
      id: id || undefined,
      nameEnglish,
      nameNepali,
      description,
      moduleId,
    }

    createRecommendation(reqData, {
      onSuccess: () => {
        toggleRecommendationForm()
        setInitialRecommendationValue(addRecommendationInitialValues)
        resetForm()
      },
    })
  }

  useEffect(() => {
    if (recommendationDetails) {
      const { id, nameEnglish, nameNepali, description, moduleId } =
        recommendationDetails
      setInitialRecommendationValue({
        id,
        nameEnglish,
        nameNepali,
        description,
        moduleId,
      })
    }
  }, [recommendationDetails])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
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
          !!openRecommendationForm && resetForm()
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
            resetForm()
          },
        }}
      >
        <form>
          <Grid sm={'sm:grid-cols-12'} gap="gap-4">
            <Grid.Col sm={'sm:col-span-12'}>
              <Form.Select
                isDisabled={viewOnly}
                isRequired
                isLoading={moduleNameFetching}
                options={documentModuleNameOption}
                calculateValueOnChange
                value={values.moduleId}
                errors={errors}
                touched={touched}
                name="moduleId"
                label={t('recommendation.moduleName')}
                onChange={(event) => {
                  setFieldValue(event.name, event?.main || '')
                }}
                onBlur={handleBlur}
              />
            </Grid.Col>
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
                maxLength={300}
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
