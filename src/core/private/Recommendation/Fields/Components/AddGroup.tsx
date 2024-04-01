import { useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useCreateGroup } from '../services/groups.query'
import Form from '@/components/functional/Form/Form'
import { Grid } from '@/components/ui'
import Modal from '@/components/ui/Modal/Modal'
import {
  IAddGroupInitialValue,
  IAddGroupPayload,
  IAddGroupResponse,
} from '../schema/group.interface'
import {
  addGroupInitialValues,
  addGroupValidationSchema,
} from '../schema/group.schema'
import { decodeParams } from '@/utility/route-params'
import { useParams } from 'react-router-dom'
import { getTextByLanguage } from '@/lib/i18n/i18n'

const AddGroup = ({
  toggleGroupForm,
  openGroupForm,
  editGroupData,
  viewOnly,
  setViewOnly,
}: {
  toggleGroupForm: VoidFunction
  openGroupForm: boolean
  editGroupData?: IAddGroupResponse
  viewOnly?: boolean
  setViewOnly?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { t } = useTranslation()
  const params = useParams()
  const recommendationId = decodeParams<string>(params?.id)

  const [initialGroupValue, setInitialGroupdValue] = useState({
    ...addGroupInitialValues,
    recommendationId: recommendationId ?? '',
  })

  const { mutate: createGroup, isLoading: createGroupLoading } =
    useCreateGroup()

  const handleAddGroup = (values: IAddGroupInitialValue) => {
    const { id, nameEnglish, nameNepali, showInForm } = values

    const reqData: IAddGroupPayload = {
      id: id || '',
      nameEnglish: nameEnglish,
      nameNepali: nameNepali,
      recommendationId: recommendationId!,
      showInForm: showInForm,
    }

    createGroup(reqData, {
      onSuccess: () => {
        toggleGroupForm()
        setInitialGroupdValue(addGroupInitialValues)
        resetForm()
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
    resetForm,
  } = useFormik({
    initialValues: editGroupData
      ? {
          id: editGroupData.id,
          nameEnglish: editGroupData.nameEnglish,
          nameNepali: editGroupData.nameNepali,
          recommendationId: editGroupData.recommendationId,
          showInForm: editGroupData.showInForm,
        }
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
            ? getTextByLanguage('Edit Group', 'समूह सम्पादन गर्नुहोस्')
            : getTextByLanguage('Add Group', 'समूह थप्नुहोस्')
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
                label={getTextByLanguage(
                  'Group Name English',
                  'समूहको नाम अंग्रेजीमा'
                )}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-6'}>
              <Form.Input
                isNepali
                disabled={viewOnly}
                isRequired
                value={values.nameNepali}
                errors={errors}
                touched={touched}
                name="nameNepali"
                label={getTextByLanguage(
                  'Group Name Nepali',
                  'समूहको नाम नेपालीमा'
                )}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid.Col>

            <Grid.Col sm={'sm:col-span-4'}>
              <Form.Switch
                isRequired
                className="inline"
                checked={values.showInForm}
                errors={errors}
                touched={touched}
                name="showInForm"
                label={t('recommendation.showInForm')}
                onChange={() => {
                  setFieldValue('showInForm', !values.showInForm)
                }}
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
