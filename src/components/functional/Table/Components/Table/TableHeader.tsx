import {
  tableHeaderBaseStyle,
  tableHeaderThStickyStyle,
  tableHeaderThStyle,
} from '@/components/functional/Table/Components/Table/table.schema'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { flexRender, HeaderGroup, RowData } from '@tanstack/react-table'

interface ITableHeaderProps<TData> {
  headerGroup: () => HeaderGroup<TData>[]
  withScrollable?: boolean
}

const TableHeader = <TData extends RowData>({
  headerGroup,
  withScrollable,
}: ITableHeaderProps<TData>) => {
  const computedHeaderBaseStyle = getComputedClassNames(tableHeaderBaseStyle, {
    [tableHeaderThStickyStyle]: !!withScrollable,
  })

  return (
    <thead className={computedHeaderBaseStyle}>
      {headerGroup().map((headerContent) => (
        <tr key={headerContent.id}>
          {headerContent.headers.map((header, index, headers) => {
            const hasSticky =
              (header.column.columnDef as any)?.sticky &&
              ((header.column.columnDef as any)?.sticky === 'left' ||
                (header.column.columnDef as any)?.sticky === 'right')
            const stickyValue = (header.column.columnDef as any)?.sticky
            const isLastLeftChildSticky =
              hasSticky && stickyValue === 'left'
                ? !(
                    (headers[index + 1]?.column?.columnDef as any)?.sticky ===
                    'left'
                  ) || null
                : null

            const isFirstRigthChildSticky =
              hasSticky && stickyValue === 'right'
                ? !(
                    (headers[index - 1]?.column?.columnDef as any)?.sticky ===
                    'right'
                  ) || null
                : null

            return (
              <th
                data-sticky-td={hasSticky || null}
                data-sticky-last-left-td={isLastLeftChildSticky}
                data-sticky-first-right-td={isFirstRigthChildSticky}
                key={header.id}
                colSpan={header.colSpan}
                className={`${tableHeaderThStyle} ${
                  header.id === 'Sn' ? 'w-24' : ''
                } ${hasSticky ? 'bg-gray-92' : ''} `}
                style={
                  hasSticky
                    ? stickyValue === 'left'
                      ? {
                          left: header.getStart(),
                          zIndex: 4,
                          minWidth:
                            header.column.columnDef.id === 'action'
                              ? 'undefined'
                              : header.getSize(),
                        }
                      : {
                          right:
                            headers[headers.length - 1].getStart() -
                            header.getStart(),
                          zIndex: 4,
                          minWidth:
                            header.id === 'action'
                              ? 'undefined'
                              : header.getSize(),
                        }
                    : {}
                }
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
