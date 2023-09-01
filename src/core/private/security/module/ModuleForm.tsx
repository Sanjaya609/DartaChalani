import React, { useEffect, useState } from 'react'
import { ModuleSchemaData, moduleValidationSchema } from './schema';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useActiveModuleData, useModulePost } from './query';
import { useActiveResourceData } from '../resource/query';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../components/utils';
import Button from '../../../../components/derived/Buttons/Buttons';
import { Box, FlexBox } from '../../../../components/core';
import { CheckBox, Input, Label } from '../../../../components/core/FormElement';
import FormikValidationError from '../../../../components/FormikValidationError/FormikValidationError';
import StyledSelect, { OptionType } from '../../../../components/StyledSelect/StyledSelect';
import i18next from 'i18next';

interface ModuleFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: ModuleSchemaData;
  // isEdit: boolean;
  // setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function ModuleForm(props: ModuleFormProps) {
  const { toggle, isOpen, formData } = props;
  const { mutate } = useModulePost()
  const { t } = useTranslation()
  const [activeModule, setActiveModule] = useState<OptionType[]>([])
  const [resourceOptionData, setResourcesData] = useState<OptionType[]>([])
  const { data: resourceData, isFetched: isResourceDataFetched, isSuccess: isResourceDataSuccessFetched, isLoading: isResourceDataLoading } = useActiveResourceData()
  const { data: activeModuleData, isFetching: isActiveModuleFetching, isSuccess: isActiveModuleSuccess, isFetched: isActiveModuleFetched } = useActiveModuleData()
  useEffect(() => {
    if (activeModuleData?.data?.data && isActiveModuleFetched && isActiveModuleSuccess) {
      setActiveModule(activeModuleData.data.data.filter(el => el.isConfigurable === false).map(el => ({
        label: i18next.language === 'en' ? el.moduleNameEnglish : el.moduleNameNepali,
        value: el.id
      })))
    }
  }, [activeModuleData?.data?.data, isActiveModuleFetched, isActiveModuleSuccess])
  useEffect(() => {
    if (resourceData?.data?.data && isResourceDataFetched && isResourceDataSuccessFetched) {
      setResourcesData(resourceData?.data?.data.map(el => ({ label: el.resourceName, value: el.id })))
    }
  }, [resourceData?.data?.data, isResourceDataFetched, isResourceDataSuccessFetched])
  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: moduleValidationSchema,
    onSubmit: (values: ModuleSchemaData) => {
      console.log(values)
      let payload = {
        ...values,
        resourceIds: values.resourceIds.length ? values.resourceIds.map(el => Number(el.value)) : [],
        parentModuleId: values.parentModuleId ? Number(values.parentModuleId.value) : null
      }
      if (formData.id) {
        payload.id = formData.id
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
        <p>{t('moduleSetup')} {t('form')}</p>
      </ModalHeader>
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <ModalBody>
          <Box className='row'>
            <FlexBox className="col-12 mb-2" >
              <CheckBox checked={values.isConfigurable} name='isConfigurable' onChange={() => setFieldValue('isConfigurable', !values.isConfigurable)} className='mr-2' />
              <Label htmlFor="isConfigurable" className='ml-4'>{t('isConfigurable')}?</Label>
              <FormikValidationError name="isConfigurable" errors={errors} touched={touched} />
            </FlexBox>
            <Box className="col-12 mb-2">
              <Label htmlFor="parentModuleId">{t('parentModule')}</Label>
              <StyledSelect
                options={activeModule}
                name="resourceIds"
                value={values.parentModuleId}
                multi={false}
                onChange={(e) => {
                  setFieldValue('parentModuleId', e.value);
                }}
                onBlur={handleBlur}
                isLoading={isActiveModuleFetching}
              />
              <FormikValidationError name="parentModuleId" errors={errors} touched={touched} />
            </Box>
            <Box className="col-6 mb-2">
              <Label htmlFor="code">{`${t('code')}`}{"*"}</Label>
              <Input value={values.code} onChange={handleChange} onBlur={handleBlur} name="code" />
              <FormikValidationError name="code" errors={errors} touched={touched} />
            </Box>
            <Box className="col-6 mb-2">
              <Label htmlFor="moduleNameEnglish">{`${t('moduleName')} (${t('inEnglish')})`}{"*"}</Label>
              <Input value={values.moduleNameEnglish} onChange={handleChange} onBlur={handleBlur} name="moduleNameEnglish" />
              <FormikValidationError name="moduleNameEnglish" errors={errors} touched={touched} />
            </Box>
            <Box className="col-6 mb-2">
              <Label htmlFor="moduleNameNepali">{`${t('moduleName')} (${t('inNepali')})`} {"*"}</Label>
              <Input value={values.moduleNameNepali} onChange={handleChange} onBlur={handleBlur} name="moduleNameNepali" />
              <FormikValidationError name="moduleNameNepali" errors={errors} touched={touched} />
            </Box>
            <Box className="col-6 mb-2">
              <Label htmlFor="iconClass">{`${t('iconClass')}`}{"*"}</Label>
              <Input value={values.iconClass} onChange={handleChange} onBlur={handleBlur} name="iconClass" />
              <FormikValidationError name="iconClass" errors={errors} touched={touched} />
            </Box>
            <Box className="col-12 mb-2">
              <Label htmlFor="description">{`${t('description')}`}{"*"}</Label>
              <Input value={values.description} onChange={handleChange} onBlur={handleBlur} name="description" />
              <FormikValidationError name="description" errors={errors} touched={touched} />
            </Box>
            {values.isConfigurable && <Box className="col-12 mb-2">
              <Label htmlFor="resourceIds">{t('resources')}{"*"}</Label>
              <StyledSelect
                options={resourceOptionData}
                name="resourceIds"
                value={values.resourceIds}
                multi={true}
                onChange={(e) => {
                  setFieldValue('resourceIds', e.value);
                }}
                onBlur={handleBlur}
                isLoading={isResourceDataLoading}
              />
              <FormikValidationError name="resourceIds" errors={errors} touched={touched} />
            </Box>}
            <Box className="col-12 mb-2">
              <Label htmlFor="url">{`${t('url')}`}{"*"}</Label>
              <Input value={values.url} onChange={handleChange} onBlur={handleBlur} name="url" />
              <FormikValidationError name="url" errors={errors} touched={touched} />
            </Box>
            <Box className="col-12 mb-2">
              <Label htmlFor="orderNumber">{t('orderNo')}{"*"}</Label>
              <Input value={values.orderNumber ?? ''} onChange={handleChange} onBlur={handleBlur} name="orderNumber" type='number' />
              <FormikValidationError name="orderNumber" errors={errors} touched={touched} />
            </Box>
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

export default ModuleForm