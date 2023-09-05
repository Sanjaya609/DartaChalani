/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TableRowBaseStyle, TableRowStyle } from '@/components/functional/Table/Components/Table/table.schema'
import {
  tableRowBaseStyle,
  tableRowStyle,
} from '@/components/functional/Table/Components/Table/table.schema'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { Row, RowData, RowModel, flexRender } from '@tanstack/react-table'
import { DotsSix } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'

interface ITableBodyProps<TData> {
  getRowModel: () => RowModel<TData>
  paddingTop?: number
  tableData?: TAny[]
  paddingBottom?: number
  handleRowClick?: (data: Row<TData>) => void
  updateOrder?: boolean
  updateOrderFunction?: (updatedData: any) => void
}

const TableBody = <TData extends RowData>({
  getRowModel,
  tableData,
  paddingTop,
  paddingBottom,
  handleRowClick,
  updateOrder = false,
  updateOrderFunction,
}: ITableBodyProps<TData>) => {
  const { rows } = getRowModel()
  const [data, setData] = useState(tableData)
  useEffect(() => {
    if (Array.isArray(tableData)) {
      setData(tableData)
    }
  }, [tableData])

  const DraggableRow: React.FC<{
    row: Row<TData>
    reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void
    // eslint-disable-next-line react/no-unstable-nested-components
  }> = ({ row, reorderRow }) => {
    const dropRef = useRef(null)
    const dragRef = useRef(null)

    return (
      <tr
        className={`${getComputedClassNames(
          'shadow-inset',
          'hover:bg-orange-88'
        )}`}
        onClick={() => handleRowClick && handleRowClick(row)}
        ref={dropRef}
        style={{ opacity: 1, width: '100%' }}
      >
        {row?.getVisibleCells().map((cell) => {
          // console.log(cell.column.id === 'Order')
          if (cell.column.id === 'draggable') {
            return (
              <td ref={dragRef}>
                <button ref={dragRef} type="button">
                  <DotsSix size={20} />
                </button>
              </td>
            )
          }
          return (
            <td
              className="whitespace-nowrap p-3 text-sm  text-cool-gray-800"
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          )
        })}
      </tr>
    )
  }
  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    const dragData = data
    if (Array.isArray(dragData)) {
      // dragData.splice(
      //   targetRowIndex,
      //   0,
      //   dragData.splice(draggedRowIndex, 1)[0] as VirtualItem
      // )
      ;[dragData[draggedRowIndex], dragData[targetRowIndex]] = [
        dragData[targetRowIndex],
        dragData[draggedRowIndex],
      ]
      setData([...dragData])
    }

    // eslint-disable-next-line no-console
    console.log(data, 'targetRowIndex')
  }
  if (Array.isArray(data)) {
    return (
      <tbody>
        {paddingTop && paddingTop > 0 ? (
          <tr>
            <td style={{ height: `${paddingTop}px` }} />
          </tr>
        ) : null}
        {data.map((virtualRow: { index: number }) => {
          const row = rows[virtualRow.index] as Row<TData>
          return (
            <DraggableRow
              key={`${row?.id}-${virtualRow.index}`}
              row={row}
              reorderRow={reorderRow}
            />
            // <tr
            //   className={tableRowBaseStyle}
            //   onClick={() => handleRowClick && handleRowClick(row)}
            //   // ${
            //   //   virtualRow.index % 2 ? 'bg-gray-94' : 'bg-white'
            //   // }

            //   key={row.id}
            // >
            //   {row.getVisibleCells().map((cell) => {
            //     return (
            //       <td className={tableRowStyle} key={cell.id}>
            //         {flexRender(cell.column.columnDef.cell, cell.getContext())}
            //       </td>
            //     )
            //   })}
            // </tr>
          )
        })}
        {paddingBottom && paddingBottom > 0 ? (
          <tr className={tableRowBaseStyle}>
            <td style={{ height: `${paddingBottom}px` }} />
          </tr>
        ) : null}
      </tbody>
    )
  }
  return (
    <tbody>
      {getRowModel().rows.map((row) => {
        return (
          <tr
            key={row.id}
            className={tableRowBaseStyle}
            onClick={() => handleRowClick && handleRowClick(row)}
            //  className={`${tableRowBaseStyle} ${idx % 2 ? 'bg-gray-98' : 'bg-white'}`}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <td className={tableRowStyle} key={cell.id}>
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
