import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { PropsWithChildren } from 'react'

const badgeClass = 'rounded-2xl px-3  flex text-white font-semibold'

const badgeType = {
  green: 'bg-green-56',
  warning: 'bg-yellow-56',
  danger: 'bg-red-56',
}

interface IBadgeProps extends PropsWithChildren {
  className?: string
  type?: keyof typeof badgeType
}

const Badge = (props: IBadgeProps) => {
  const { className, children, type } = props
  const computedBadgeClass = getComputedClassNames(
    badgeClass,
    badgeType[type || 'green'],
    className
  )
  return <span className={computedBadgeClass}>{children}</span>
}

export default Badge
