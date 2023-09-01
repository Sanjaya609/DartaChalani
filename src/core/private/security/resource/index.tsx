import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ResourseData, initalResourceData } from './schema';
import Layout from '../../../../components/layout';
import { HeaderTitle } from '../../../../components/Header/Header';
import Button from '../../../../components/derived/Buttons/Buttons';
import ResourceForm from './ResourceForm';
import ResourceTable from './ResourceTable';

function Resource() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation()
  const [formData, setFormData] = useState<ResourseData>(initalResourceData);
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>  <Layout.Header>
      <HeaderTitle>{t('resourceSetup')}</HeaderTitle>
      <Button
        className="btn btn-primary btn-icon lft"
        onClick={() => {
          setFormData(initalResourceData);
          toggle();
        }}>
        <i className="ic-add"></i>
        {t('create')}
      </Button>
    </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <ResourceForm formData={formData} toggle={toggle} isOpen={isOpen} />
          <Layout.Flex>
            <ResourceTable toggle={toggle} setFormData={setFormData} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  )
}

export default Resource