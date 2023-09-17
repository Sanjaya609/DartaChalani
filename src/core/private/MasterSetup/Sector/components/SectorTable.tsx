import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ISectorInitialValue,
  ISectorResponse,
} from '../schema/sector.interface'
import {
  useChangeSectorStatus,
  useGetAllSector,
} from '../services/sector.query'

interface ISectorTableProps {
  initialValues: ISectorInitialValue
  setInitialValues: React.Dispatch<React.SetStateAction<ISectorInitialValue>>
}

const SectorTable = (props: ISectorTableProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const { t } = useTranslation()
  const { data: sectorData, isFetching } = useGetAllSector()
  const { mutate: changeSectorStatus, isLoading: changeSectorStatusLoading } =
    useChangeSectorStatus()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const handleEditClick = ({
    id,
    orderNumber,
    subSectorNameEnglish: sectorNameEnglish,
    subSectorNameNepali: sectorNameNepali,
  }: ISectorResponse) => {
    setInitialValues({
      id,
      orderNumber,
      sectorNameEnglish,
      sectorNameNepali,
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeSectorStatus(
        { sectorId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<ISectorResponse>[]>(
    () => [
      {
        header: t('masterSetup.sector.sectorNameEnglish'),
        accessorKey: 'subSectorNameEnglish',
      },
      {
        header: t('masterSetup.sector.sectorNameEnglish'),
        accessorKey: 'subSectorNameNepali',
      },
      {
        header: t('masterSetup.sector.orderNumber'),
        accessorKey: 'orderNumber',
      },
      {
        header: t('masterSetup.sector.status'),
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
        title={t('masterSetup.sector.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeSectorStatusLoading,
        }}
      >
        {t('masterSetup.sector.modal.status.description')}
      </Modal>
    </>
  )
}

export default SectorTable
