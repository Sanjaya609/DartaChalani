import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import React from 'react'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={getComputedClassNames(
        'bg-muted animate-pulse rounded-md',
        className
      )}
      {...props}
    />
  )
}

export default Skeleton
