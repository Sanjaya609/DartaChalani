import { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  useCreateGroup,
} from './services/groups.query'
import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import Modal from '@/components/ui/Modal/Modal'
import {
  IAddGroupInitialValue,
  IAddGroupPayload,
  IAddGroupResponse,
} from './schema/group.interface'
import {
  addGroupInitialValues,
  addGroupValidationSchema,
} from './schema/group.schema'

const AddGroup = ({
  toggleGroupForm,
  openGroupForm,
  editGroupData,
  viewOnly,
  setViewOnly,
  recommendationId,
}: {
  toggleGroupForm: VoidFunction
  openGroupForm: boolean
  editGroupData?: IAddGroupResponse
  viewOnly?: boolean
  setViewOnly?: React.Dispatch<React.SetStateAction<boolean>>
  recommendationId: number | null
}) => {
  const { t } = useTranslation()
  const [initialGroupValue, setInitialGroupdValue] = useState(addGroupInitialValues)

  console.log(initialGroupValue, "filter")

  const { mutate: createGroup, isLoading: createGroupLoading } =
    useCreateGroup()

  const handleAddGroup = (values: IAddGroupInitialValue) => {
    const { id, nameEnglish, nameNepali, recommendationId } = values

    const reqData: IAddGroupPayload = {
      id: id || '',
      nameEnglish: nameEnglish,
      nameNepali: nameNepali,
      recommendationId: recommendationId,
    }

    createGroup(reqData, {
      onSuccess: () => {
        toggleGroupForm()
        setInitialGroupdValue(addGroupInitialValues)
        resetForm()
      },
    })
  }

  // useEffect(() => {
  //   if (groupDetails) {
  //     const { id, nameEnglish, nameNepali, recommendationId } = groupDetails
  //     setInitialGroupdValue({
  //       id,
  //       nameEnglish,
  //       nameNepali,
  //       recommendationId,
  //     })
  //   }
  // }, [groupDetails])

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
    initialValues: editGroupData 
    ? { 
      id: editGroupData.id, 
      nameEnglish: editGroupData.nameEnglish, 
      nameNepali: editGroupData.nameNepali, 
      recommendationId: editGroupData.recommendationId } 
    : initialGroupValue,
    enableReinitialize: true,
    validationSchema: addGroupValidationSchema,
    onSubmit: (values) => {
      handleAddGroup(values)
    },
  })

  return (
    <>
      <Modal
        open={!!openGroupForm}
        toggleModal={() => {
          toggleGroupForm()
          setInitialGroupdValue(addGroupInitialValues)
          setViewOnly && setViewOnly(false)
        }}
        size="md"
        title={
          editGroupData
            ? t('recommendation.editRecommendation')
            : t('recommendation.addRecommendation')
        }
        saveBtnProps={{
          btnAction: handleSubmit,
          loading: createGroupLoading,
          btnTitle: t('btns.save'),
        }}
        cancelBtnProps={{
          btnAction: () => {
            toggleGroupForm()
            loading: createGroupLoading
            setInitialGroupdValue(addGroupInitialValues)
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
                label="Group Name English"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                disabled={viewOnly}
                isRequired
                value={values.nameNepali}
                errors={errors}
                touched={touched}
                name="nameNepali"
                label="Group Name Nepali"
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

export default AddGroup
