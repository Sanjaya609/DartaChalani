import { Flexbox } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'

interface ISectionHeaderProps {
  title?: string | React.ReactNode
}

const SectionHeader = (props: ISectionHeaderProps) => {
  const { title } = props
  return (
    <Flexbox className="w-full bg-white px-16 py-3 ">
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
    </Flexbox>
  )
}

export default SectionHeader
