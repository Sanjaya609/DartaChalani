import { Box } from '@/components/ui'
import classNames from 'classnames'
import React, { useState } from 'react'

import { Icon } from '@/components/ui/core/Icon'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { IconProps } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { TFuncKey } from 'i18next'
import { Flexbox } from '@/components/ui/core/Flexbox'

import {
  CountBgClassMapping,
  CountColorClassMapping,
  IconColorClassMapping,
  TabDisplayClassMapping,
  TabStatesMapping,
  TypesVariant,
} from './Tabs.schema'
import { Text } from '../core/Text'

interface TabHeaderProps {
  alignment?: 'horizontal' | 'vertical'

  variant?: TypesVariant
  display?: 'inline-block' | 'block' | 'flex'
  className?: string

  tabs: Array<TabsProps>
  handleClick?: (value: string | number) => void
}

export interface TabsProps {
  label: TFuncKey
  value: number | string
  count?: number
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
}

const TabHeader: React.FunctionComponent<TabHeaderProps> = (props) => {
  const [openTab, setOpenTab] = useState('Home')
  const { t } = useTranslation()
  const {
    tabs,
    variant = 'default',
    className,
    alignment = 'horizontal',
    display,
    handleClick,
  } = props

  const tabHeaderComputedClass = getComputedClassNames(
    'inline-block',
    TabDisplayClassMapping[variant],
    {
      'flex flex-col': alignment === 'vertical',
      'flex flex-1': display === 'block',
      'inline-block': display === 'inline-block',
    },

    className
  )
  const tabSelectedComputedClass = getComputedClassNames('px-4 py-2 ', {
    'w-full': display === 'block',
  })

  const IconComputedClass = getComputedClassNames(
    'mr-2',
    IconColorClassMapping[variant]
  )

  return <>Tab</>
  // return (
  //   <Tab.List as={Box} className={tabHeaderComputedClass}>
  //     {tabs.map((tab: TabsProps) => {
  //       return (
  //         <Tab
  //           key={tab?.value}
  //           onClick={() => {
  //             setOpenTab(tab?.label)
  //             if (handleClick) {
  //               handleClick(tab?.value)
  //             }
  //           }}
  //           className={({ selected }) =>
  //             classNames(
  //               tabSelectedComputedClass,
  //               selected
  //                 ? TabStatesMapping[variant]
  //                 : 'text-gray-40 hover:bg-cool-gray-100 hover:text-gray-800 '
  //             )
  //           }
  //         >
  //           <Flexbox
  //             align="center"
  //             className={'ml-2'}
  //             justify={`${alignment === 'horizontal' ? 'center' : 'flex-start'
  //               }`}
  //           >
  //             {tab?.icon && (
  //               <Icon
  //                 icon={tab?.icon}
  //                 size={20}
  //                 className={IconComputedClass}
  //               />
  //             )}

  //             <Text typeface="medium" className="font-Inter text-sm leading-4 	">
  //               {t(`${tab?.label}`)}
  //             </Text>
  //             {tab.count && (
  //               <Box
  //                 className={`${openTab === tab?.label
  //                   ? CountBgClassMapping[variant]
  //                   : 'bg-cool-gray-200'
  //                   }   ml-2 inline-flex	h-4 w-4 items-center justify-center rounded-full `}
  //               >
  //                 <Text
  //                   typeface="normal"
  //                   className={`${openTab === tab?.label
  //                     ? CountColorClassMapping[variant]
  //                     : 'text-cool-gray-600'
  //                     } text-xs leading-4`}
  //                 >
  //                   {tab.count}
  //                 </Text>
  //               </Box>
  //             )}
  //           </Flexbox>
  //         </Tab>
  //       )
  //     })}
  //   </Tab.List>
  // )
}
export default TabHeader
