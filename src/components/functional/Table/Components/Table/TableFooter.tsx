import { PaginationState, RowData, Table } from '@tanstack/react-table'
import {
  ArrowLineLeft,
  ArrowLineRight,
  CaretLeft,
  CaretRight,
} from 'phosphor-react'
import {
  getPageNumbers,
  paginationRowOpt,
} from '@/components/functional/Table/Utils/table-utils'
import { Box, Button, Flexbox } from '@/components/ui'
import {
  tableFooterButtonNotAllowedStyle,
  tableFooterButtonStyle,
  tableFooterCountStyle,
  tableFooterStyle,
} from '@/components/functional/Table/Components/Table/table.schema'
import { useMemo } from 'react'
import { Text } from '@/components/ui/core/Text'
// import { TableFooterCountStyle, TableFooterStyle } from '@/components/functional/Table/Components/Table/table.schema'

interface ITableFooterProps<TData> {
  table: Table<TData>
  pagination?: PaginationState
  paginationServer?: boolean
  paginationRowsPerPageOptions?: Array<number>
}

const TableFooter = <TData extends RowData>({
  table,
  pagination,
  paginationServer,
  paginationRowsPerPageOptions = paginationRowOpt,
}: ITableFooterProps<TData>) => {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageSize = paginationServer
    ? pagination?.pageSize || 10
    : table.getState().pagination.pageSize
  const total = paginationServer
    ? table.getPageCount() * (pagination?.pageSize || 10)
    : table.getPrePaginationRowModel().rows.length

  const pageNumbers = getPageNumbers({
    currentPage,
    pageSize,
    total,
  })

  const handleDotPageChange = (i: number) => {
    const isSecondlastIdx = pageNumbers[pageNumbers.length - 2] === '...'
    const pageIndex = isSecondlastIdx
      ? (pageNumbers[pageNumbers.length - 1] as number) - 2
      : i
    table.setPageIndex(pageIndex)
  }

  const pagesStartEndData = useMemo(() => {
    const page = currentPage - 1
    return {
      startPage: page * pageSize + 1,
      endPage: page * pageSize + table.getRowModel().rows.length,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, table.getRowModel().rows.length])

  return (
    <Box className={tableFooterStyle}>
      <Flexbox align="center">
        <Text variant="h6" color="text-gray-56">
          View
        </Text>
        <select
          className={tableFooterCountStyle}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {paginationRowsPerPageOptions.map((pageSizeOpt) => (
            <option key={pageSizeOpt} value={pageSizeOpt}>
              {pageSizeOpt}
            </option>
          ))}
        </select>
        <Text variant="h6" color="text-gray-56">
          per page
        </Text>
      </Flexbox>

      <Box className="flex items-center justify-items-center">
        <Flexbox align="center">
          <Text
            variant="h6"
            typeface="semibold"
            color="text-gray-32"
            className="pr-10"
          >{`${pagesStartEndData?.startPage} - ${pagesStartEndData?.endPage} of ${total}`}</Text>
          <Button
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            btnType="ghost"
            size="sm"
            variant="primary"
            className={
              !table.getCanPreviousPage()
                ? tableFooterButtonNotAllowedStyle
                : tableFooterButtonStyle
            }
          >
            <ArrowLineLeft size={18} className="text-gray-56 " />
          </Button>
          <Button
            type="button"
            btnType="ghost"
            size="sm"
            variant="primary"
            onClick={() => table.previousPage()}
            className={
              !table.getCanPreviousPage()
                ? tableFooterButtonNotAllowedStyle
                : tableFooterButtonStyle
            }
          >
            <CaretLeft size={18} className="text-gray-56 " />
          </Button>
        </Flexbox>

        {/* <Box className="mx-3 flex"> */}
        {pageNumbers.map((pageNumber, i) =>
          pageNumber === '...' ? (
            <button
              type="button"
              onClick={() => {
                handleDotPageChange(i)
              }}
              key={pageNumber}
            >
              &hellip;
            </button>
          ) : (
            <Box key={pageNumber} className="flex items-center">
              {pageNumber === table.getState().pagination.pageIndex + 1 ? (
                <Button
                  type="button"
                  btnType="ghost"
                  size="sm"
                  variant="primary"
                  className="cursor-pointer rounded bg-navy-40 py-1 text-white "
                >
                  {pageNumber}
                </Button>
              ) : (
                <Button
                  type="button"
                  btnType="ghost"
                  size="sm"
                  variant="primary"
                  className={tableFooterButtonStyle}
                  onClick={() => table.setPageIndex((pageNumber as number) - 1)}
                >
                  {pageNumber}
                </Button>
              )}
            </Box>
          )
        )}
        {/* </Box> */}
        <Button
          type="button"
          btnType="ghost"
          size="sm"
          variant="primary"
          onClick={() => table.nextPage()}
          className={
            !table.getCanNextPage()
              ? tableFooterButtonNotAllowedStyle
              : tableFooterButtonStyle
          }
          disabled={!table.getCanNextPage()}
        >
          <CaretRight size={18} />
        </Button>
        <Button
          type="button"
          btnType="ghost"
          variant="primary"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className={
            !table.getCanNextPage()
              ? tableFooterButtonNotAllowedStyle
              : tableFooterButtonStyle
          }
          disabled={!table.getCanNextPage()}
        >
          <ArrowLineRight size={18} className="text-gray-56  " />
        </Button>
      </Box>
    </Box>
  )
}

export default TableFooter
