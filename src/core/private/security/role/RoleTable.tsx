import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { RoleData, RoleDataPayload } from './schema';
import { Cell } from 'react-table';
import { TableAction } from '../../../../components/Table/TableComponent';
import Table from '../../../../components/Table/DataTable';
import { UseRoleStatus, useRolesData } from './query';
import { Switch } from '../../../../components/core/FormElement';
import { useTranslation } from 'react-i18next';
import { toastNotify } from '../../../../components/ToastNotifier/ToastNotifier';
import { useNavigate } from 'react-router-dom';
import { privateRoutePath } from '../../../../routes/private/privateRoutePath';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';

interface RoleTableProps {
    toggle?: () => void;
    setFormData: Dispatch<SetStateAction<RoleDataPayload>>;
}
function RoleTable(props: RoleTableProps) {
    const { mutate } = UseRoleStatus()
    const { toggle, setFormData } = props;
    const { data, isFetching } = useRolesData()
    const [toggleData, setToggleData] = useState<boolean>(false);
    const [idToToggle, setIdToToggle] = useState<string>("")
    const { t } = useTranslation()
    const handleToggleData = (id: string) => {
        mutate(Number(id), {
            onSuccess: (res: any) => {
                if (res.data.status) {
                    toastNotify.success(res.data.message)
                }
            }
        }
        )
    }
    const columns = useMemo(
        () => [
            { Header: `${t('roleName')} (${t('inEnglish')})`, accessor: 'roleNameEnglish' },
            { Header: `${t('roleName')} (${t('inNepali')})`, accessor: 'roleNameNepali' },
            { Header: t('roleType'), accessor: 'roleType' },
            {
                Header: t('active'),
                Cell: ({ row }: Cell<RoleData>) => {
                    const { id, isActive } = row.original
                    return (<Switch checked={isActive} onChange={() => {
                        setIdToToggle(String(id))
                        setToggleData(true)
                    }} />)
                }
            },
            {
                Header: t('action'),
                Cell: ({ row }: Cell<RoleData>) => {
                    const { id, roleNameEnglish, roleNameNepali, roleType, description, isActive } = row.original;
                    const navigate = useNavigate()
                    return (
                        <TableAction
                            handleEditClick={
                                () => {
                                    toggle && toggle();
                                    setFormData({ id, roleNameEnglish, roleNameNepali, roleType: { label: roleType, value: roleType }, description, isActive });
                                }
                            }
                            handleConfigurationClick={() => {
                                navigate(`${privateRoutePath.roleModuleSetup}/${id}`)
                            }}
                        />
                    );
                }
            }
        ],
        [setFormData, t, toggle]
    );
    return (
        <>
            <Table
                loading={isFetching}
                data={data?.data?.data || []}
                columns={columns}
                isSearch
            />
            <ConfirmModal toggleConfirmModal={() => setToggleData(!toggleData)}
                handleConfirmClick={() => handleToggleData(idToToggle)}
                confirmModal={toggleData}
                title="Are you sure to change status?"
            /></>
    )
}

export default RoleTable