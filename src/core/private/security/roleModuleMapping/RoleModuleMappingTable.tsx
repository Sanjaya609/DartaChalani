import { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '../../../../components/Table/DataTable';
import { useRoleModuleMappingData } from './query';
import { ModuleList, RoleModulePrivilegeData } from './schema';
// import { TableAction } from '../../../../components/Table/TableComponent';
import i18next from 'i18next';
import { Cell } from 'react-table';

interface RoleModuleMappinTableProps {
    toggle?: () => void;
    setFormData: Dispatch<SetStateAction<RoleModulePrivilegeData>>;
    roleId: number
}
function RoleModuleMappingTable(props: RoleModuleMappinTableProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { toggle, setFormData, roleId } = props;
    const { data, isFetching } = useRoleModuleMappingData(roleId)
    const { t } = useTranslation()
    const columns = useMemo(
        () => [
            { Header: `${t('module')}`, accessor: i18next.language === 'en' ? 'moduleNameEnglish' : 'moduleNameNepali' },
            {
                Header: `${t('resources')}`,
                Cell: ({ row }: Cell<ModuleList>) => {
                    const { resourceResponses } = row.original;
                    return resourceResponses.map(el => el.resourceName).join()
                }
            },

            // {
            //     Header: t('action'),
            //     Cell: ({ row }: Cell<ModuleList>) => {
            //         // const { id, roleNameEnglish, roleNameNepali, roleType, description, isActive } = row.original;
            //         return (
            //             <TableAction
            //             // handleEditClick={
            //             //     () => {
            //             //         toggle && toggle();
            //             //         setFormData({ id, roleNameEnglish, roleNameNepali, roleType: { label: roleType, value: roleType }, description, isActive });
            //             //     }
            //             // }
            //             />
            //         );
            //     }
            // }
        ],
        [t]
    );
    return (
        <Table
            loading={isFetching}
            data={data?.data?.data?.moduleList || []}
            columns={columns}
        />
    )
}

export default RoleModuleMappingTable