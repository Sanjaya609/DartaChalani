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
  const { data: fiscalYearData } = useGetAllFiscalYear()
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
            'Fiscal Year Name (English)',
            'Fiscal Year Name (Nepali)'
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
                <Badge className="ml-3">Current</Badge>
              )}
            </Flexbox>
          )
        },
      },
      {
        accessorKey: 'startDateAd',
        header: 'Start Date (AD)',
      },
      {
        accessorKey: 'startDateBs',
        header: 'Start Date (BS)',
      },
      {
        accessorKey: 'endDateAd',
        header: 'End Date (AD)',
      },
      {
        accessorKey: 'endDateBs',
        header: 'End Date (BS)',
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
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
    []
  )

  return (
    <>
      <DataTable columns={columns} data={fiscalYearData || []} />
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
