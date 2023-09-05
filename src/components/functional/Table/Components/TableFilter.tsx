import { Button, Flexbox } from '@/components/ui'
import { TFuncKey } from 'i18next'
import { CaretDown, Funnel, MagnifyingGlass, Plus } from 'phosphor-react'
import { useTranslation } from 'react-i18next'

export interface TableHeaderProps {
  hasHeaderBtn?: boolean
  tableHeaderBtnClick?: () => void
  tableHeaderLabel?: string
  hasFilterBtn?: boolean
}

function TableFilter(props: TableHeaderProps) {
  const { t } = useTranslation()
  const { tableHeaderBtnClick, tableHeaderLabel, hasHeaderBtn, hasFilterBtn } =
    props
  return (
    <Flexbox align="center" justify="space-between" className="mb-4 w-full">
      {/* <Button
        variant="gray"
        size="regular"
        type="button"
        icons="icons"
        className="mr-4 border border-gray-80 bg-white"
      >
        <SortAscending size={16} />
        {t('btns.sort')} <CaretDown size={16} />{' '}
      </Button> */}
      {/* <TextInput
        containerClassName=""
        leftIcon={<MagnifyingGlass size={16} className="mr-3" />}
        placeholder={`${t('btns.search')}`}
      /> */}
      {hasFilterBtn && (
        <Button
          variant="gray"
          size="regular"
          type="button"
          icons="icons"
          className="ml-4 border border-gray-80 bg-white"
        >
          <Funnel className="mr-2" size={16} weight="bold" />
          {t('btns.filter')} <CaretDown size={16} className="ml-2" />{' '}
        </Button>
      )}
      {hasHeaderBtn ? (
        <Button
          variant="success"
          size="regular"
          type="button"
          icons="icons"
          className="ml-4 whitespace-nowrap border border-gray-80"
          onClick={tableHeaderBtnClick}
        >
          <>
            <Plus className="mr-2" size={16} weight="bold" />
            {tableHeaderLabel ? t(`${tableHeaderLabel as TFuncKey}`) : ''}
          </>
        </Button>
      ) : (
        ''
      )}
    </Flexbox>
  )
}

export default TableFilter
