import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IOfficeInitialValue,
  IOfficeListResponse,
} from '../schema/office.interface'
import {
  useChangeOfficeStatus,
  useGetAllOffice,
} from '../services/office.query'
import useGetPrivilegeByPath from '@/hooks/useGetPrivilegeByPath'
import { routePaths } from '@/router'

interface IOfficeProps {
  initialValues: IOfficeInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<IOfficeInitialValue>>
}

const Office = (props: IOfficeProps) => {
  const { setInitialValues } = props
  const privilege = useGetPrivilegeByPath(routePaths.masterSetup.office)

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: sectorData, isFetching } = useGetAllOffice()
  const { mutate: changeSectorStatus, isLoading: changeSectorStatusLoading } =
    useChangeOfficeStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = (values: IOfficeListResponse) => {
    setInitialValues(values)
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeSectorStatus(
        { officeId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IOfficeListResponse>[]>(
    () => [
      {
        header: t('masterSetup.office.officeNameEn'),
        accessorKey: 'officeNameEn',
      },
      {
        header: t('masterSetup.office.officeNameNP'),

        accessorKey: 'officeNameNP',
      },

      {
        header: t('masterSetup.office.addressEn'),
        accessorKey: 'addressEn',
      },
      {
        header: t('masterSetup.office.addressNp'),

        accessorKey: 'addressNp',
      },
      {
        header: t('masterSetup.office.wardNo'),

        accessorKey: getTextByLanguage('wardNo', 'wardNoNp'),
      },

      {
        header: t('masterSetup.office.status'),
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
        sticky: 'right',
        id: 'action',
        cell: ({ row: { original } }) => (
          <TableAction
            privilege={privilege}
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
        canSearch
        isLoading={isFetching}
        columns={columns}
        data={sectorData || []}
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.office.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeSectorStatusLoading,
        }}
      >
        {t('masterSetup.office.modal.status.description')}
      </Modal>
    </>
  )
}

export default Office
