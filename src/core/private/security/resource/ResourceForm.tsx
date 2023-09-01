import React from 'react'
import { Privilege, ResourseData, httpMethod, resourceFormValidationSchema } from './schema';
import { useResourcePost } from './query';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../../components/derived/utils/Modal';
import { Box } from '../../../../components/core';
import { Input, Label } from '../../../../components/core/FormElement';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import StyledSelect from '../../../../components/StyledSelect/StyledSelect';
import Button from '../../../../components/derived/Buttons/Buttons';
interface ResourceFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: ResourseData;
  // isEdit: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function ResourceForm(props: ResourceFormProps) {
  const { toggle, isOpen, formData } = props;
  const { mutate } = useResourcePost()
  const { t } = useTranslation()
  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: resourceFormValidationSchema,
    onSubmit: (values: ResourseData) => {
      console.log(values)
      let payload = {
        ...values,
        isActive: true,
        httpMethod: values.httpMethod?String(values.httpMethod.value):'',
        privilege:values.privilege?String(values.privilege.value):''
      }
      if (formData.id) {
        payload.id = formData.id
        payload.isActive = formData.isActive
      }
      mutate(payload, {
        onSuccess: (res: any) => {
          if (res.data.status) {
            toastNotify.success(res.data.message)
            resetForm()
            toggle()
          }
        }
      })

    }
  });
  return (
    <Modal
      toggle={() => {
        resetForm();
        toggle();
      }}
      isOpen={isOpen}>
      <ModalHeader
        toggle={() => {
          resetForm();
          toggle();
        }}>
        <p>{t('resourceSetup')} {t('form')}</p>
      </ModalHeader>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <ModalBody>
          <Box className="mb-2">
            <Label htmlFor="">{t('httpMethod')}</Label>
            <StyledSelect
              options={Object.values(httpMethod).map(ek => ({ label: ek, value: ek }))}
              name="httpMethod"
              value={values.httpMethod}
              onChange={(e) => {
                setFieldValue('httpMethod', e.value);
              }}
              onBlur={handleBlur}
            />
            <FormikValidationError name="httpMethod" errors={errors} touched={touched} />
          </Box>
          <Box className="mb-2">
            <Label htmlFor="">{t('privilege')}</Label>
            <StyledSelect
              options={Object.values(Privilege).map(ek => ({ label: ek, value: ek }))}
              name="privilege"
              value={values.privilege}
              onChange={(e) => {
                setFieldValue('privilege', e.value);
              }}
              onBlur={handleBlur}
            />
            <FormikValidationError name="privilege" errors={errors} touched={touched} />
          </Box>

          <Box className="mb-2">
            <Label htmlFor="resourceName">{t('resourceName')}</Label>
            <Input value={values.resourceName} onChange={handleChange} onBlur={handleBlur} name="resourceName" />
            <FormikValidationError name="resourceName" errors={errors} touched={touched} />
          </Box>
          <Box className="mb-2">
            <Label htmlFor="url">{t('url')}</Label>
            <Input value={values.url} onChange={handleChange} onBlur={handleBlur} name="url" />
            <FormikValidationError name="url" errors={errors} touched={touched} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn  btn-success `}
            type="submit"
          >
            {formData.id ? t('edit') : t('submit')}
          </Button>
        </ModalFooter>
      </form>

    </Modal>
  )
}

export default ResourceForm