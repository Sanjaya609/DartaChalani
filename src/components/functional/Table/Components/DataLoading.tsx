import { Box } from '@/components/ui'
import { getTextByLanguage } from '@/lib/i18n/i18n'

interface IDataLoadingProps {
  columnCount: number
}

const DataLoading = (props: IDataLoadingProps) => {
  const { columnCount } = props
  return (
    <tr>
      <td colSpan={columnCount} className="mx-auto w-full py-3 text-center">
        <Box as={'span'} className="mr-2 font-semibold text-gray-16">
          {' '}
          {getTextByLanguage('Loading data', 'डाटा लोड हुदै छ')}
        </Box>
        <Box
          as={'span'}
          className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <Box
          as={'span'}
          className="mb-1 mr-2  inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
        <Box
          as={'span'}
          className="mb-1 mr-2 inline-block h-1 w-1 animate-ping rounded-full bg-gray-900 duration-1000 ease-in-out"
        />
      </td>
    </tr>
  )
}

export default DataLoading
