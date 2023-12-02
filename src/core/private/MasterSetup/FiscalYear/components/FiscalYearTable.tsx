import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import {
  tableActionIcon,
  tableActionList,
  tableActionTooltip,
  tableActionTooltipChange,
} from '@/components/functional/Table/Components/Table/table.schema'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import { Box, Flexbox } from '@/components/ui'
import Badge from '@/components/ui/Badge/Badge'
import Modal from '@/components/ui/Modal/Modal'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowLineRight } from 'phosphor-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IFiscalYearInitialValue,
  IFiscalYearResponse,
} from '../schema/fiscalyear.interface'
import {
  useChangeFiscalYearStatus,
  useGetAllFiscalYear,
  useSwitchCurrentFiscalYear,
} from '../services/fiscalyear.query'

interface IFiscalYearTableProps {
  initialValues: IFiscalYearInitialValue
  setInitialValues: React.Dispatch<
    React.SetStateAction<IFiscalYearInitialValue>
  >
}

const FiscalYearTable = (props: IFiscalYearTableProps) => {
  const { setInitialValues } = props

  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )
  const [currentSwitchSelectedId, setCurrentSwitchSelectedId] = useState<
    null | number
  >(null)
  const { t } = useTranslation()
  const { data: fiscalYearData, isFetching } = useGetAllFiscalYear()
  const {
    mutate: changeFiscalYearStatus,
    isLoading: changeFiscalYearStatusLoading,
  } = useChangeFiscalYearStatus()
  const {
    mutate: switchCurrentFiscalYear,
    isLoading: switchFiscalYearLoading,
  } = useSwitchCurrentFiscalYear()

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)
  const setOrRemoveCurrentSwitchSelectedId = (id?: number) =>
    setCurrentSwitchSelectedId(id || null)

  const handleEditClick = ({
    id,
    endDateAd,
    endDateBs,
    fiscalYearNameEn,
    fiscalYearNameNp,
    startDateAd,
    startDateBs,
  }: IFiscalYearResponse) => {
    setInitialValues({
      id,
      endDateAd,
      endDateBs,
      fiscalYearNameEn,
      fiscalYearNameNp,
      startDateAd,
      startDateBs,
    })
  }

  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeFiscalYearStatus(
        { fiscalYearId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  const handleSwitchCurrentStatus = () => {
    if (currentSwitchSelectedId) {
      switchCurrentFiscalYear(
        { fiscalYearId: currentSwitchSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSwitchSelectedId()
          },
        }
      )
    }
  }

  const columns = React.useMemo<ColumnDef<IFiscalYearResponse>[]>(
    () => [
      {
        header: () =>
          getTextByLanguage(
            t('masterSetup.fiscalYear.fiscalYearNameEn'),
            t('masterSetup.fiscalYear.fiscalYearNameNp')
          ),
        accessorKey: getTextByLanguage('fiscalYearNameEn', 'fiscalYearNameNp'),
        cell: ({ row: { original } }) => {
          return (
            <Flexbox className="w-full " align="center">
              <span>
                {getTextByLanguage(
                  original.fiscalYearNameEn,
                  original.fiscalYearNameNp
                )}
              </span>
              {original.isCurrentFiscalYear && (
                <Badge className="ml-3">
                  {t('masterSetup.fiscalYear.current')}
                </Badge>
              )}
            </Flexbox>
          )
        },
      },
      {
        accessorKey: 'startDateAd',
        header: t('masterSetup.fiscalYear.startDateAd'),
      },
      {
        accessorKey: 'startDateBs',
        header: t('masterSetup.fiscalYear.startDateBs'),
      },
      {
        accessorKey: 'endDateAd',
        header: t('masterSetup.fiscalYear.endDateAd'),
      },
      {
        accessorKey: 'endDateBs',
        header: t('masterSetup.fiscalYear.endDateBs'),
      },
      {
        accessorKey: 'isActive',
        header: t('masterSetup.fiscalYear.status'),
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
        cell: ({ row: { original } }) => (
          <TableAction
            handleEditClick={() => {
              handleEditClick(original)
            }}
            otherActionsComp={
              <>
                {!original.isCurrentFiscalYear && (
                  <li
                    className={tableActionList}
                    title={t(
                      'masterSetup.fiscalYear.modal.currentFiscalYear.title'
                    )}
                    onClick={() =>
                      setOrRemoveCurrentSwitchSelectedId(original.id)
                    }
                  >
                    <span className="group relative">
                      <ArrowLineRight className={tableActionIcon} />
                    </span>
                  </li>
                )}
              </>
            }
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
        data={fiscalYearData || []}
        canSearch
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.fiscalYear.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeFiscalYearStatusLoading,
        }}
      >
        {t('masterSetup.fiscalYear.modal.status.description')}
      </Modal>

      <Modal
        open={!!currentSwitchSelectedId}
        toggleModal={setOrRemoveCurrentSwitchSelectedId}
        size="md"
        title={t('masterSetup.fiscalYear.modal.currentFiscalYear.title')}
        saveBtnProps={{
          btnAction: handleSwitchCurrentStatus,
          loading: switchFiscalYearLoading,
        }}
      >
        {t('masterSetup.fiscalYear.modal.currentFiscalYear.description')}
      </Modal>
    </>
  )
}

export default FiscalYearTable
