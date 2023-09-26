import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  RoleSetupFormSchema,
  RoleSetupTableData,
} from '../schema/roleSetup.interface'
import { useChangeRoleStatus, useGetAllRole } from '../services/roleSetup.query'

interface RoleSetupTableProps {
  initialValues: RoleSetupFormSchema
  setInitialValues: React.Dispatch<React.SetStateAction<RoleSetupFormSchema>>
}

const ActionComponent = (
  row: RoleSetupTableData,
  setInitialValues: React.Dispatch<React.SetStateAction<RoleSetupFormSchema>>
) => {
  const { id, roleNameEnglish, roleNameNepali, roleType, description } = row
  return (
    <TableAction
      handleEditClick={() => {
        setInitialValues({
          id,
          roleNameEnglish,
          roleNameNepali,
          roleType,
          description,
        })
      }}
    />
  )
}

const RoleSetupTable = ({
  initialValues,
  setInitialValues,
}: RoleSetupTableProps) => {
  const { data: roleList } = useGetAllRole()

  const { t } = useTranslation()
  const { mutate: changeRoleStatus, isLoading: changeRoleStatusLoading } =
    useChangeRoleStatus()
  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )
  const columns = React.useMemo<ColumnDef<RoleSetupTableData>[]>(
    () => [
      {
        accessorKey: 'roleNameEnglish',
        header: t('security.roleSetup.roleNameEnglish'),
      },

      {
        accessorKey: 'roleNameNepali',
        header: t('security.roleSetup.roleNameNepali'),
      },
      {
        accessorKey: 'roleType',
        header: t('security.roleSetup.roleType'),
      },
      {
        accessorKey: 'isActive',
        header: t('security.roleSetup.status'),
        cell: ({ row: { original } }) => (
          <Switch
            checked={original.isActive}
            onChange={() => {
              setOrRemoveCurrentSelectedId(original.id)
            }}
          />
        ),
      },

      {
        header: 'Actions',
        cell: ({ row: { original } }) => {
          return ActionComponent(original, setInitialValues)
        },
      },
    ],
    []
  )
  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)
  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeRoleStatus(
        { roleId: currentSelectedId },
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
      <DataTable className="pb-4" columns={columns} data={roleList || []} />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.fiscalYear.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeRoleStatusLoading,
        }}
      >
        {t('masterSetup.fiscalYear.modal.status.description')}
      </Modal>
    </>
  )
}

export default RoleSetupTable
