import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IUserSetupInitialValue,
  IUserSetupResponse,
} from '../schema/user-setup.interface'
import {
  useChangeUserStatus,
  useGetAllUser,
} from '../services/user-setup.query'

interface ISectorTableProps {
  initialValues: IUserSetupInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<IUserSetupInitialValue>>
}

const SectorTable = (props: ISectorTableProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: sectorData, isFetching } = useGetAllUser()
  const { mutate: changeUserStatus, isLoading: changeUserStatusLoading } =
    useChangeUserStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = ({
    email,
    fullNameEn,
    fullNameNp,
    username,
    id,
  }: IUserSetupResponse) => {
    setInitialValues({
      id,
      email,
      fullNameEn,
      fullNameNp,
      password: '',
      roleId: '',
      username,
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeUserStatus(
        { userId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IUserSetupResponse>[]>(
    () => [
      {
        header: t('security.userSetup.fullNameEn'),
        accessorKey: 'fullNameEn',
      },
      {
        header: t('security.userSetup.fullNameNp'),
        accessorKey: 'fullNameNp',
      },
      {
        header: t('security.userSetup.username'),
        accessorKey: 'username',
      },
      {
        header: t('security.userSetup.email'),
        accessorKey: 'email',
      },
      {
        header: t('security.userSetup.roleId'),
        accessorKey: 'roleId',
      },
      {
        header: t('security.userSetup.status'),
        accessorKey: 'isActive',
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
        header: t('actions'),
        cell: ({ row: { original } }) => (
          <TableAction
            handleEditClick={() => {
              handleEditClick(original)
            }}
          />
        ),
      },
    ],
    [t]
  )

  return (
    <>
      <DataTable
        isLoading={isFetching}
        columns={columns}
        data={sectorData || []}
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('security.userSetup.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeUserStatusLoading,
        }}
      >
        {t('security.userSetup.modal.status.description')}
      </Modal>
    </>
  )
}

export default SectorTable
