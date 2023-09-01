import React, { useCallback, useEffect, useState } from 'react'
import { RoleModulePrivilegeData, roleModulePrivilegeValidationSchema } from './schema';
import { useAllConfigutModuleData } from '../module/query';
import StyledSelect, { OptionType } from '../../../../components/StyledSelect/StyledSelect';
import i18next from 'i18next';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { useRoleModuleMappingPost } from './query';
import { useFormik } from 'formik';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../components/derived/utils';
import { useTranslation } from 'react-i18next';
import Button from '../../../../components/derived/Buttons/Buttons';
import { Box } from '../../../../components/core';
import { Label } from '../../../../components/core/FormElement';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';

interface RoleModuleMappingFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: RoleModulePrivilegeData;
  roleId: number
  // isEdit: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function RoleModuleMappingForm(props: RoleModuleMappingFormProps) {
  const { toggle, isOpen, formData, roleId } = props
  const { mutate } = useRoleModuleMappingPost()
  const { t } = useTranslation();
  const { data: configurableModuleData, isLoading: isLoadingConfigurableModule, isFetched: isFetchedConfigurableModule, isSuccess: isSuccessConfigurableModule } = useAllConfigutModuleData()
  const [configurableList, setConfigurableList] = useState<OptionType[]>([])
  const [resources, setResources] = useState<OptionType[]>([])

  useEffect(() => {
    if (configurableModuleData?.data?.data && isFetchedConfigurableModule && isSuccessConfigurableModule) {
      setConfigurableList(configurableModuleData.data.data.map(el => ({
        label: i18next.language === 'en' ? el.moduleNameEnglish : el.moduleNameNepali,
        value: el.id
      })))
    }
  }, [configurableModuleData?.data?.data, isFetchedConfigurableModule, isSuccessConfigurableModule])

  const setResourcesByModuleId = useCallback((moduleId: number) => {
    const foundReources = configurableModuleData?.data?.data?.find(el => el.id === moduleId)?.resourceResponses
    if (foundReources) {
      setResources(foundReources.map(el => ({
        label: el.resourceName,
        value: el.id
      })))
    }
  }, [configurableModuleData?.data?.data])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: roleModulePrivilegeValidationSchema,
    onSubmit: (values: RoleModulePrivilegeData) => {
      console.log(values)
      let payload = {
        // ...values,
        // moduleId: Number(values.moduleId),
        resourceIds: values.resourceIds.length ? values.resourceIds.map(el => Number(el.value)) : [],
        roleId: roleId
      }
      // if (formData.id) {
      //   payload.id = formData.id
      // }
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
        <p>{t('moduleSetup')} {t('form')}</p>
      </ModalHeader>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <ModalBody>
          <Box className="col-12 mb-2">
            <Label htmlFor="moduleId">{t('module')}</Label>
            <StyledSelect
              options={configurableList}
              name="moduleId"
              value={values.moduleId}
              multi={false}
              onChange={(e) => {
                setFieldValue('moduleId', e.value);
                setResourcesByModuleId(Number(e.main))
              }}
              onBlur={handleBlur}
              isLoading={isLoadingConfigurableModule}
            />
            <FormikValidationError name="moduleId" errors={errors} touched={touched} />
          </Box>
          <Box className="col-12 mb-2">
            <Label htmlFor="resourceIds">{t('resources')}</Label>
            <StyledSelect
              options={resources}
              name="resourceIds"
              value={values.resourceIds}
              multi={true}
              onChange={(e) => {
                setFieldValue('resourceIds', e.value);
              }}
              onBlur={handleBlur}
            />
            <FormikValidationError name="resourceIds" errors={errors} touched={touched} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            className={`btn  btn-success `}
            type="submit"
          >
            {/* {formData.id ? t('edit') : t('submit')} */}
            {t('submit')}
          </Button>
        </ModalFooter>
      </form></Modal>
  )
}

export default RoleModuleMappingForm