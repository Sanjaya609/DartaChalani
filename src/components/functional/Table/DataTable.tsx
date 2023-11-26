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
import { Box, Flexbox, Layout } from '@/components/ui'
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
import DataLoading from './Components/DataLoading'

interface IHeaderAdd {
  title?: string
  handleAdd?: VoidFunction
}

export interface ITableProps<TData extends RowData> extends TableHeaderProps {
  data: TData[]
  columns: ColumnDef<TData>[]
  isLoading?: boolean
  paginationRowsPerPageOptions?: number[]
  rowSelection?: RowSelectionState
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  handleRowClick?: (data: Row<TData>) => void
  handleRowSelectedData?: (data: RowModel<TData>) => void
  customButtonComponent?: React.ReactElement
  isDraggable?: boolean
  updateOrder?: boolean
  removeAbsolute?: boolean
  updateOrderFunction?: (updatedData: any) => void
  hasFilterBtn?: boolean
  hasSortingBtn?: boolean
  className?: string
  withScrollable?: boolean
  withSN?: boolean
}

interface FixedHeightTableProps {
  children: JSX.Element
  withScrollable: boolean
  forTableFooter?: boolean
}
const FixedHeightTable = ({
  withScrollable,
  children,
}: FixedHeightTableProps) => {
  return withScrollable ? (
    <Layout.Absolute scrollable>{children}</Layout.Absolute>
  ) : (
    <>{children}</>
  )
}

const NormalDataTable = <TData extends RowData>({
  data,
  columns,
  isLoading = false,
  paginationRowsPerPageOptions,
  rowSelection,
  setRowSelection,

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
  withScrollable = true,
  withSN = false,

  addHeaderProps,
  canFilter,
  canSearch,
  customAddFilter,
  customTableFilter,
  filterClassName,
}: ITableProps<TData>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const { t } = useTranslation()

  const memorizedData = React.useMemo(() => data, [data])
  const memoizedColumns = React.useMemo(
    () => [
      {
        id: 'Sn',
        header: () => t('sn'),
        show: !!withSN,
        cell: (prop: TAny) => prop.row.index + 1,
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
  })
  const isNoDataFound = !isLoading && table.getRowModel().rows?.length === 0

  useEffect(
    () =>
      rowSelection &&
      handleRowSelectedData &&
      handleRowSelectedData(table.getSelectedRowModel()),

    [handleRowSelectedData, rowSelection, table]
  )

  const showTableFilter = React.useMemo(() => {
    return (
      !!canSearch ||
      !!customAddFilter ||
      !!canFilter ||
      !!customAddFilter ||
      !!customButtonComponent
    )
  }, [
    canSearch,
    customAddFilter,
    canFilter,
    customButtonComponent,
    customAddFilter,
  ])

  return (
    <>
      {showTableFilter && (
        <TableFilter
          filterClassName={filterClassName}
          canFilter={canFilter}
          canSearch={canSearch}
          addHeaderProps={addHeaderProps}
          customAddFilter={customAddFilter}
          customTableFilter={customTableFilter}
          searchValue={globalFilter}
          setSearchValue={setGlobalFilter}
        />
      )}

      <Flexbox className="h-full w-full flex-col">
        <Box className={tableBaseStyle}>
          <FixedHeightTable withScrollable={withScrollable}>
            <table className={tableMainStyle}>
              <TableHeader
                headerGroup={table.getHeaderGroups}
                withScrollable={withScrollable}
              />
              {isNoDataFound && <TableNoDataFound />}
              {isLoading && (
                <DataLoading columnCount={memoizedColumns.length} />
              )}
              {!isNoDataFound && !isLoading && (
                <TableBody getRowModel={table.getRowModel} />
              )}
            </table>
          </FixedHeightTable>
        </Box>
        <TableFooter
          table={table}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        />
      </Flexbox>
    </>
    // </div>
  )
}

export default NormalDataTable
