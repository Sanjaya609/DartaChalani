import { flexRender, RowData, RowModel } from '@tanstack/react-table'
import { tableBodyRowStyle, tableBodyTdStyle } from './table.schema'

interface ITableBodyProps<TData> {
  getRowModel: () => RowModel<TData>
  paddingTop?: number
  tableData?: TAny[]
  paddingBottom?: number
}

const TableBody = <TData extends RowData>({
  getRowModel,
}: ITableBodyProps<TData>) => {
  return (
    <tbody>
      {getRowModel().rows.map((row) => {
        return (
          <tr key={row.id} className={tableBodyRowStyle}>
            {row.getVisibleCells().map((cell, index, cells) => {
              const hasSticky =
                (cell.column.columnDef as any)?.sticky &&
                ((cell.column.columnDef as any)?.sticky === 'left' ||
                  (cell.column.columnDef as any)?.sticky === 'right')
              const stickyValue = (cell.column.columnDef as any)?.sticky
              const isLastLeftChildSticky =
                hasSticky && stickyValue === 'left'
                  ? !(
                      (cells[index + 1]?.column?.columnDef as any)?.sticky ===
                      'left'
                    ) || null
                  : null

              const isFirstRigthChildSticky =
                hasSticky && stickyValue === 'right'
                  ? !(
                      (cells[index - 1]?.column?.columnDef as any)?.sticky ===
                      'right'
                    ) || null
                  : null

              return (
                <td
                  data-sticky-td={hasSticky ? 'true' : null}
                  data-sticky-last-left-td={isLastLeftChildSticky}
                  data-sticky-first-right-td={isFirstRigthChildSticky}
                  className={`${tableBodyTdStyle} ${
                    hasSticky ? 'bg-white shadow-[0_-1px_0_0_#ccc_inset]' : ''
                  }`}
                  key={cell.id}
                  style={
                    hasSticky
                      ? stickyValue === 'left'
                        ? {
                            left: cell.column.getStart(),
                          }
                        : {
                            right:
                              cells[cells.length - 1]?.column.getStart() -
                              cell.column.getStart(),
                          }
                      : {}
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

export default TableBody
