import {
  tableActionIcon,
  tableActionList,
  tableActionTooltip,
  tableActionTooltipChange,
  tableActionWrapper,
} from '@/components/functional/Table/Components/Table/table.schema'
import { Box, Button } from '@/components/ui'
import { defaultPrivilegeEnum } from '@/hooks/useGetPrivilegeByPath'
import { IPRIVILEGEENUM, PRIVILEGEENUM } from '@/utility/enums/privilege.enum'
import { Eye, Gear, PencilSimple, TrashSimple } from 'phosphor-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ActionProps {
  handleEditClick?: () => void
  handleDeleteClick?: () => void
  handleViewClick?: () => void
  handleConfigureClick?: () => void
  otherActionsComp?: React.ReactNode
  privilege?: IPRIVILEGEENUM
}

function TableAction(props: ActionProps) {
  const { t } = useTranslation()
  const {
    handleEditClick,
    handleDeleteClick,
    handleViewClick,
    handleConfigureClick,
    privilege: propsPrivilege,
  } = props

  const privilege = {
    ...propsPrivilege,
  }

  // for bypassing the permissions

  const byPassPermissionAccess =
    process.env.NODE_ENV === 'production'
      ? false
      : import.meta.env.VITE_BYPASS_PERMISSION === 'true'
  if (byPassPermissionAccess) {
    let i: keyof typeof privilege
    for (i in privilege) {
      privilege[i] = true
    }
  }

  if (!('privilege' in props)) {
    let i: keyof typeof privilege
    for (i in defaultPrivilegeEnum) {
      privilege[i] = true
    }
  }

  return (
    <ul className={tableActionWrapper}>
      {handleViewClick && !!privilege?.READ && (
        <li className={tableActionList}>
          <span className="group relative " onClick={() => handleViewClick?.()}>
            <Eye className={tableActionIcon} />
            <Box as="span" className={tableActionTooltip}>
              {t('btns.view')}
            </Box>
          </span>
        </li>
      )}

      {handleEditClick && !!privilege?.UPDATE && (
        <li className={tableActionList}>
          <span className="group relative" onClick={() => handleEditClick?.()}>
            <PencilSimple className={tableActionIcon} />
            <Box
              as="span"
              className={`${tableActionTooltipChange} ${tableActionTooltip}`}
            >
              {t('btns.edit')}
            </Box>
          </span>
        </li>
      )}

      {handleDeleteClick && !!privilege?.DELETE && (
        <li className={tableActionList}>
          <span
            className="group relative"
            onClick={() => handleDeleteClick?.()}
          >
            <TrashSimple className={tableActionIcon} />
            <Box as="span" className={tableActionTooltip}>
              {t('btns.delete')}
            </Box>
          </span>
        </li>
      )}
      {handleConfigureClick && (
        <li className={tableActionList}>
          <span
            className="group relative"
            onClick={() => handleConfigureClick?.()}
          >
            <Gear className={tableActionIcon} weight="fill" />
            <Box as="span" className={tableActionTooltip}>
              {t('btns.setting')}
            </Box>
          </span>
        </li>
      )}
      {props?.otherActionsComp}
    </ul>
  )
}

export default TableAction
