import { TableNoDataFound } from '@/components/functional/Table/Components/NoDataFound'
import TableFilter from '@/components/functional/Table/Components/TableFilter'
import {
  tableBaseStyle,
  tableMainStyle,
  tableWrapper,
} from '@/components/functional/Table/Components/Table/table.schema'
import TableBody from '@/components/functional/Table/Components/Table/TableBody'
import TableFooter from '@/components/functional/Table/Components/Table/TableFooter'
import TableHeader from '@/components/functional/Table/Components/Table/TableHeader'
import { TableHeaderProps } from '@/components/functional/Table/Components/TableFilter'

import { fuzzyFilter } from '@/components/functional/Table/Utils/table-utils'
import { Box, Flexbox } from '@/components/ui'
import AbsoluteLayout from '@/components/ui/core/Layout/AbsoluteLayout'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  RowData,
  RowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'

export interface ITableProps<TData extends RowData> extends TableHeaderProps {
  data: TData[]
  columns: ColumnDef<TData>[]
  isLoading?: boolean
  paginationRowsPerPageOptions?: number[]
  rowSelection?: RowSelectionState
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  showTableFilter?: boolean
  handleRowClick?: (data: Row<TData>) => void
  handleRowSelectedData?: (data: RowModel<TData>) => void
  customButtonComponent?: React.ReactElement
  isDraggable?: boolean
  updateOrder?: boolean
  removeAbsolute?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateOrderFunction?: (updatedData: any) => void
  hasFilterBtn?: boolean
  hasSortingBtn?: boolean
  className?: string
}

const NormalDataTable = <TData extends RowData>({
  data,
  columns,
  isLoading = false,
  paginationRowsPerPageOptions,
  rowSelection,
  setRowSelection,
  hasHeaderBtn = false,
  tableHeaderBtnClick,
  tableHeaderLabel = 'add',
  showTableFilter = true,
  handleRowClick = () => {},
  handleRowSelectedData = () => {},
  customButtonComponent,
  isDraggable,
  updateOrder = false,
  hasFilterBtn = false,
  hasSortingBtn = false,
  updateOrderFunction,
  removeAbsolute = false,
  className,
}: ITableProps<TData>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { t } = useTranslation()

  const memorizedData = React.useMemo(() => data, [data])
  const memoizedColumns = React.useMemo(
    () =>
      isDraggable
        ? [
            {
              id: 'draggable',
              header: () => '',
              cell: (prop) => prop.row.index + 1,
            },
            {
              id: 'Sn',
              header: () => t('serial-number'),
              cell: (prop) => prop.row.index + 1,
            },
            ...columns,
          ]
        : [
            {
              id: 'Sn',
              header: () => t('serial-number'),
              cell: (prop) => prop.row.index + 1,
            },
            ...columns,
          ],
    [columns, isDraggable, t]
  )

  const hiddenColumns = memoizedColumns?.reduce<Record<string, boolean>>(
    (accColumns, column) => {
      const copyColumns = { ...accColumns }
      if ('show' in column && !column.show) {
        if ('accessorKey' in column) {
          copyColumns[column.accessorKey as string] = false
        } else if ('id' in column) {
          copyColumns[column.id as string] = false
        }
      }
      return copyColumns
    },
    {}
  )

  const table = useReactTable({
    data: memorizedData,
    columns: memoizedColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      rowSelection: rowSelection || undefined,
      columnFilters,
      globalFilter,
      columnVisibility: hiddenColumns,
    },
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection || undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableGlobalFilter: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })
  const isNoDataFound = !isLoading && table.getRowModel().rows?.length === 0
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()

  const paddingTop = 0
  const paddingBottom = 0

  useEffect(
    () =>
      rowSelection &&
      handleRowSelectedData &&
      handleRowSelectedData(table.getSelectedRowModel()),

    [handleRowSelectedData, rowSelection, table]
  )

  const tableWrapperClassName = getComputedClassNames(tableWrapper, className)

  return (
    <Flexbox direction="column" className={tableWrapperClassName}>
      {/* {showTableFilter && (
        <TableFilter
          tableHeaderBtnClick={tableHeaderBtnClick}
          hasHeaderBtn={hasHeaderBtn}
          tableHeaderLabel={tableHeaderLabel}
         
          customButtonComponent={customButtonComponent}
          hasFilterBtn={hasFilterBtn}
          hasSortingBtn={hasSortingBtn}
        />
      )} */}
      <Box className={tableBaseStyle}>
        <AbsoluteLayout
          scrollable
          ref={tableContainerRef}
          removeAbsolute={removeAbsolute}
        >
          <table className={tableMainStyle}>
            <TableHeader headerGroup={table.getHeaderGroups} />
            {isNoDataFound && <TableNoDataFound />}
            {isLoading && <Box>Loading ....</Box>}
            {!isNoDataFound && (
              <TableBody
                getRowModel={table.getRowModel}
                tableData={rows}
                paddingBottom={paddingBottom}
                paddingTop={paddingTop}
                handleRowClick={handleRowClick}
                updateOrder={updateOrder}
                updateOrderFunction={updateOrderFunction}
              />
            )}
          </table>
        </AbsoluteLayout>
      </Box>
      <TableFooter
        table={table}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      />
    </Flexbox>
    // </div>
  )
}

export default NormalDataTable
