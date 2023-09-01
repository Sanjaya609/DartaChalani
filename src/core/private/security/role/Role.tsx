import React, { useState } from 'react'
import Layout from '../../../../components/layout';
import { HeaderTitle } from '../../../../components/Header/Header';
import Button from '../../../../components/derived/Buttons/Buttons';
import {  RoleDataPayload, roleIntialValue } from './schema';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import { useTranslation } from 'react-i18next';

function Role() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {t} =useTranslation() 
    const [formData, setFormData] = useState<RoleDataPayload>(roleIntialValue);
    const toggle = () => setIsOpen(!isOpen)
    return (
        <>
            <Layout.Header>
                <HeaderTitle>{t('roleSetup')}</HeaderTitle>
                <Button
                    className="btn btn-primary btn-icon lft"
                    onClick={() => {
                        setFormData(roleIntialValue);
                        toggle();
                    }}>
                    <i className="ic-add"></i>
                    {t('create')}
                </Button>
            </Layout.Header>
            <div className="flex-grow-1 my-3">
                <Layout.Container stretch>
                    <RoleForm
                        toggle={toggle}
                        isOpen={isOpen}
                        formData={formData}
                    />
                    <Layout.Flex>
                        <RoleTable toggle={toggle} setFormData={setFormData} />
                    </Layout.Flex>
                </Layout.Container>
            </div>
            </>
    )
}

export default Role