import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import { Box } from '@/components/ui'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { IFiscalYearResponse } from '../schema/fiscalyear.interface'
import { useGetAllFiscalYear } from '../services/fiscalyear.query'

const FiscalYearTable = () => {
  const { data: fiscalYearData } = useGetAllFiscalYear()

  const columns = React.useMemo<ColumnDef<IFiscalYearResponse>[]>(
    () => [
      {
        accessorKey: 'fiscalYearNameEn',
        header: 'Fiscal Year Name (English)',
      },

      {
        accessorKey: 'fiscalYearNameNp',
        header: 'Fiscal Year Name (Nepali)',
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
        header: 'Actions',
        cell: () => <TableAction />,
      },
    ],
    []
  )

  return (
    <DataTable className="pb-4" columns={columns} data={fiscalYearData || []} />
  )
}

export default FiscalYearTable
