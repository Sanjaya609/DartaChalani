import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IServiceTypeInitialValue,
  IServiceTypeResponse,
} from '../schema/servicetype.interface'
import {
  useChangeServiceTypeStatus,
  useGetAllServiceType,
} from '../services/servicetype.query'

interface IServiceTypeProps {
  initialValues: IServiceTypeInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IServiceTypeInitialValue>
  >
}

const ServiceType = (props: IServiceTypeProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: serviceTypeData, isFetching } = useGetAllServiceType()
  const {
    mutate: changeServiceTypeStatus,
    isLoading: changeServiceTypeStatusLoading,
  } = useChangeServiceTypeStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = ({ id, nameEn, nameNp }: IServiceTypeResponse) => {
    setInitialValues({
      id,
      nameEn,
      nameNp,
    })
  }

  const handleStatusChange = () => {
    if (currentSelectedId) {
      changeServiceTypeStatus(
        { serviceTypeId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IServiceTypeResponse>[]>(
    () => [
      {
        header: t('masterSetup.serviceType.nameEn'),
        accessorKey: 'nameEn',
      },
      {
        header: t('masterSetup.serviceType.nameNp'),
        accessorKey: 'nameNp',
      },
      {
        header: t('masterSetup.serviceType.status'),
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
        canSearch
        data={serviceTypeData || []}
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.sector.modal.status.title')}
        saveBtnProps={{
          btnAction: handleStatusChange,
          loading: changeServiceTypeStatusLoading,
        }}
      >
        {t('masterSetup.sector.modal.status.description')}
      </Modal>
    </>
  )
}

export default ServiceType
