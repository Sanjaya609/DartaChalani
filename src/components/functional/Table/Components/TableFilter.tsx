import { Button, Flexbox } from '@/components/ui'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { TFuncKey } from 'i18next'
import { CaretDown, Funnel, MagnifyingGlass, Plus } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { Input } from '../../Form/Input/Input'

interface IAddHeaderProps {
  label?: string
  handleAdd?: VoidFunction
}

export interface TableHeaderProps {
  addHeaderProps?: IAddHeaderProps
  canSearch?: boolean
  canFilter?: boolean
  customTableFilter?: React.ReactNode
  customAddFilter?: React.ReactNode
  filterClassName?: string
  searchValue?: string
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
}

function TableFilter(props: TableHeaderProps) {
  const { t } = useTranslation()
  const {
    addHeaderProps,
    canSearch,
    canFilter,
    customTableFilter,
    customAddFilter,
    filterClassName,
    searchValue,
    setSearchValue,
  } = props
  const computedClassName = getComputedClassNames(
    'w-full mt-3',
    filterClassName
  )

  return (
    <Flexbox
      align="center"
      justify="space-between"
      className={computedClassName}
    >
      {canSearch && (
        <Input
          value={searchValue || ''}
          wrapperClassName="flex-1"
          leftIcon={<MagnifyingGlass size={16} />}
          placeholder={t('btns.search')}
          onChange={(event) => {
            setSearchValue?.(event.target.value)
          }}
        />
      )}
      {canFilter && (
        <Button
          variant="secondary"
          size="md"
          type="button"
          icons="icons"
          className="ml-4 border border-gray-80 bg-white"
        >
          <Funnel className="mr-2" size={16} weight="bold" />
          {t('btns.filter')} <CaretDown size={16} className="ml-2" />{' '}
        </Button>
      )}
      {addHeaderProps && (
        <Button
          size="md"
          type="button"
          icons="icons"
          className="ml-4 whitespace-nowrap border border-gray-80"
          onClick={() => {
            addHeaderProps?.handleAdd?.()
          }}
        >
          <>
            <Plus className="mr-2" size={16} weight="bold" />
            {addHeaderProps?.label || t('btns.add')}
          </>
        </Button>
      )}
      {customAddFilter}
    </Flexbox>
  )
}

export default TableFilter
