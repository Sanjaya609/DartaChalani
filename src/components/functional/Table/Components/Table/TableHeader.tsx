import {
  tableHeaderBaseStyle,
  tableHeaderThStyle,
} from '@/components/functional/Table/Components/Table/table.schema'
import { flexRender, HeaderGroup, RowData } from '@tanstack/react-table'

interface ITableHeaderProps<TData> {
  headerGroup: () => HeaderGroup<TData>[]
}

const TableHeader = <TData extends RowData>({
  headerGroup,
}: ITableHeaderProps<TData>) => {
  return (
    <thead className={tableHeaderBaseStyle}>
      {headerGroup().map((headerContent) => (
        <tr key={headerContent.id}>
          {headerContent.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`${tableHeaderThStyle} ${
                  header.id === 'action' ? 'w-24' : ''
                }`}
              >
                {header.isPlaceholder ? null : (
                  <button
                    type="button"
                    className={
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </button>
                )}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeader
