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
            {row.getVisibleCells().map((cell) => {
              return (
                <td className={tableBodyTdStyle} key={cell.id}>
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
