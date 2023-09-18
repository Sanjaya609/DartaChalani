import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ModuleSetupFormSchema, ModuleSetupTableData } from '../schema/moduleSetup.interface'
import { useChangeModuleStatus, useGetAllModule } from '../services/moduleSetup.query'

interface ModuleSetupTableProps {
    initialValues: ModuleSetupFormSchema
    setInitialValues: React.Dispatch<
        React.SetStateAction<ModuleSetupFormSchema>
    >
}

const ActionComponent = (row: ModuleSetupTableData, setInitialValues: React.Dispatch<
    React.SetStateAction<ModuleSetupFormSchema>
>) => {
    const {
        id,
        moduleNameEnglish,
        moduleNameNepali,
        description,
        code,
        url,
        iconClass,
        isConfigurable,
        orderNumber,
    } = row;
    return <TableAction
        handleEditClick={() => {
            setInitialValues({
                id,
                moduleNameEnglish,
                moduleNameNepali,
                description,
                code,
                url,
                iconClass,
                isConfigurable,
                orderNumber,
            })
        }}
    />
}

const ModuleSetupTable = ({ initialValues, setInitialValues }: ModuleSetupTableProps) => {
    const { data: moduelList } = useGetAllModule()

    const { t } = useTranslation();
    const {
        mutate: changeModuleStatus,
        isLoading: changeModuleStatusLoading,
    } = useChangeModuleStatus()
    const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
        null
    )
    const columns = React.useMemo<ColumnDef<ModuleSetupTableData>[]>(
        () => [
            {
                accessorKey: 'code',
                header: 'Code',
            },
            {
                accessorKey: 'moduleNameEnglish',
                header: 'Module Name (English)',
            },

            {
                accessorKey: 'moduleNameNepali',
                header: 'Module Name (Nepali)',
            },
            // {
            //     accessorKey: 'parentModule',
            //     header: 'Parent Module',
            // },
            {
                accessorKey: 'isActive',
                header: 'is Active?',
                cell: ({ row: { original } }) => (
                    <Switch
                        checked={original.isActive}
                        onChange={() => {
                            setOrRemoveCurrentSelectedId(original.id)
                        }}
                    />
                )
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                header: 'Actions',
                cell: ({ row: { original } }) => {
                    return ActionComponent(original, setInitialValues)
                },
            }
        ],
        []
    )
    const setOrRemoveCurrentSelectedId = (id?: number) =>
        setCurrentSelectedId(id || null)
    const handleChangeStatus = () => {
        if (currentSelectedId) {
            changeModuleStatus(
                { moduleId: currentSelectedId },
                {
                    onSuccess: () => {
                        setOrRemoveCurrentSelectedId()
                    },
                }
            )
        }
    }
    return (
        <>
            <DataTable className="pb-4" columns={columns} data={moduelList || []} />
            <Modal
                open={!!currentSelectedId}
                toggleModal={setOrRemoveCurrentSelectedId}
                size="md"
                title={t('masterSetup.fiscalYear.modal.status.title')}
                saveBtnProps={{
                    btnAction: handleChangeStatus,
                    loading: changeModuleStatusLoading,
                }}
            >
                {t('masterSetup.fiscalYear.modal.status.description')}
            </Modal>

        </>
    )
}

export default ModuleSetupTable
