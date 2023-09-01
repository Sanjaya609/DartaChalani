import React, { useState } from 'react'
import Layout from '../../../../components/layout';
import { HeaderTitle } from '../../../../components/Header/Header';
import Button from '../../../../components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { ModuleSchemaData, moduleIntialValue } from './schema';
import ModuleForm from './ModuleForm';
import ModuleTabel from './ModuleTabel';

function Module() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation()
  const [formData, setFormData] = useState<ModuleSchemaData>(moduleIntialValue);
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>  <Layout.Header>
      <HeaderTitle>{t('moduleSetup')}</HeaderTitle>
      <Button
        className="btn btn-primary btn-icon lft"
        onClick={() => {
          setFormData(moduleIntialValue);
          toggle();
        }}>
        <i className="ic-add"></i>
        {t('create')}
      </Button>
    </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <ModuleForm formData={formData} toggle={toggle} isOpen={isOpen} />
          <Layout.Flex>
            <ModuleTabel toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  )
}

export default Module