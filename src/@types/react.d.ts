/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

declare module 'react' {
  interface FunctionComponent<P> {
    children?: React.ReactNode
    (props: P, context?: any): React.ReactElement<any, any> | null
    propTypes?: React.WeakValidationMap<P> | undefined
    contextTypes?: React.ValidationMap<any> | undefined
    defaultProps?: Partial<P> | undefined
    displayName?: string | undefined
  }
}
