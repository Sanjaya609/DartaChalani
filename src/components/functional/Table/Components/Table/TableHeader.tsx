import {
  tableHeaderBaseStyle,
  tableHeaderThStyle,
  tableRowBaseStyle,
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
        <tr className={tableRowBaseStyle} key={headerContent.id}>
          {headerContent.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={`${tableHeaderThStyle} ${
                  header.id === 'Sn' ? 'w-24' : ''
                }`}
              >
                {header.isPlaceholder ? null : (
                  <button
                    type="button"
                    className={
                      header.column.getCanSort()
                        ? 'flex cursor-pointer select-none items-center gap-1'
                        : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 320 512"
                          height="0.8em"
                          width="0.8em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                        </svg>
                      ),
                      desc: (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 320 512"
                          height="0.8em"
                          width="0.8em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                        </svg>
                      ),
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
