import { Button, Flexbox } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { ArrowArcLeft, ArrowLeft } from 'phosphor-react'
import { useTranslation } from 'react-i18next'

interface ISectionHeaderProps {
  title: string | React.ReactNode
  backAction?: VoidFunction
}

const SectionHeader = (props: ISectionHeaderProps) => {
  const { title, backAction } = props
  const { t } = useTranslation()
  return (
    <Flexbox
      align="center"
      justify="space-between"
      className="w-full bg-white px-16 py-3 "
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
