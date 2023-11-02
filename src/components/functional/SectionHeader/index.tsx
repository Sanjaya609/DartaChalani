import { Button, Flexbox } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { ArrowArcLeft, ArrowLeft } from 'phosphor-react'
import { useTranslation } from 'react-i18next'

interface ISectionHeaderProps {
  title: string | React.ReactNode
  backAction?: VoidFunction
  className?: string
}

const SectionHeader = (props: ISectionHeaderProps) => {
  const { title, backAction, className } = props
  const { t } = useTranslation()
  const computedClassName = getComputedClassNames(
    'w-full bg-white px-16 py-3',
    className
  )

  return (
    <Flexbox
      align="center"
      justify="space-between"
      className={computedClassName}
    >
      {title ? (
        typeof title === 'string' ? (
          <Text typeface="extrabold" className="text-primary" variant="h5">
            {title}
          </Text>
        ) : (
          title
        )
      ) : (
        <></>
      )}

      {backAction && (
        <Button
          size="sm"
          className="flex items-center"
          variant="secondary"
          btnType="ghost"
          onClick={backAction}
        >
          <ArrowLeft size={16} className="mr-2" /> {t('btns.back')}
        </Button>
      )}
    </Flexbox>
  )
}

export default SectionHeader
