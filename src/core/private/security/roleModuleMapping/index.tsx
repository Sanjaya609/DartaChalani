import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RoleModulePrivilegeData, roleModulePrivilegeInitalValue } from './schema';
import Layout from '../../../../components/layout';
import { HeaderTitle } from '../../../../components/Header/Header';
import Button from '../../../../components/derived/Buttons/Buttons';
import RoleModuleMappingForm from './RoleModuleMappingForm';
import RoleModuleMappingTable from './RoleModuleMappingTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoleByIdData } from '../role/query';
import i18next from 'i18next';
import { FlexBox } from '../../../../components/core';
import { BiArrowBack } from 'react-icons/bi';
import { privateRoutePath } from '../../../../routes/private/privateRoutePath';

function RoleModuleMapping() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation()
    const params = useParams();
    const [roleId, setRoleId] = useState<number>(0)
    const [formData, setFormData] = useState<RoleModulePrivilegeData>(roleModulePrivilegeInitalValue);
    const { data: roleDataById, isSuccess: isRoleByIdSucces } = useRoleByIdData(roleId)

    const toggle = () => setIsOpen(!isOpen)
    useEffect(() => {
        if (params?.roleId) {
            setRoleId(Number(params?.roleId));
        }
    }, [params?.roleId]);
    return (
        <>  <Layout.Header>
            <HeaderTitle>{t('roleModulePrivilegeSetup')} ({isRoleByIdSucces && i18next.language === 'en' ? roleDataById.data?.data?.roleNameEnglish : roleDataById?.data?.data?.roleNameNepali})</HeaderTitle>
            <FlexBox>
                <Button
                    className="btn btn-primary btn-icon lft mr-4"
                    onClick={() => {
                        setFormData(roleModulePrivilegeInitalValue);
                        toggle();
                    }}>
                    <i className="ic-add"></i>
                    {t('create')}
                </Button>
                <Button className="btn btn-secondary text-primary " onClick={() => {
                    navigate(privateRoutePath.roleSetup)
                }}><BiArrowBack />Back</Button>
            </FlexBox>
        </Layout.Header>
            <div className="flex-grow-1 my-3">
                <Layout.Container stretch>
                    <RoleModuleMappingForm roleId={roleId} formData={formData} toggle={toggle} isOpen={isOpen} />
                    <Layout.Flex>
                        <RoleModuleMappingTable roleId={roleId} toggle={toggle} setFormData={setFormData} />
                    </Layout.Flex>
                </Layout.Container>
            </div>
        </>
    )
}

export default RoleModuleMapping