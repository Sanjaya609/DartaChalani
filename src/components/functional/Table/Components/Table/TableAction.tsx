import {
  tableActionIcon,
  tableActionList,
  tableActionTooltip,
  tableActionTooltipChange,
  tableActionWrapper,
} from '@/components/functional/Table/Components/Table/table.schema'
import { Box, Button } from '@/components/ui'
import { Eye, Gear, PencilSimple, TrashSimple } from 'phosphor-react'
import { useTranslation } from 'react-i18next'

interface ActionProps {
  handleEditClick?: () => void
  handleDeleteClick?: () => void
  handleViewClick?: () => void
  handleConfigureClick?: () => void
  handleLogClick?: () => void
}

function TableAction(props: ActionProps) {
  const { t } = useTranslation()
  const {
    handleEditClick,
    handleDeleteClick,
    handleViewClick,
    handleConfigureClick,
  } = props

  return (
    <ul className={tableActionWrapper}>
      <li className={tableActionList}>
        <Button
          type="button"
          btnType="ghost"
          size="xs"
          variant="secondary"
          onClick={() => handleViewClick && handleViewClick()}
          className="group relative"
        >
          <Eye className={tableActionIcon} />
          <Box as="span" className={tableActionTooltip}>
            {t('btns.view')}
          </Box>
        </Button>
      </li>

      <li className={tableActionList}>
        <Button
          type="button"
          btnType="ghost"
          size="xs"
          variant="secondary"
          onClick={() => handleEditClick && handleEditClick()}
          className="group relative"
        >
          <PencilSimple className={tableActionIcon} />
          <Box
            as="span"
            className={`${tableActionTooltipChange} ${tableActionTooltip}`}
          >
            {t('btns.edit')}
          </Box>
        </Button>
      </li>

      <li className={tableActionList}>
        <Button
          type="button"
          btnType="ghost"
          size="xs"
          variant="secondary"
          className="group relative"
          onClick={() => handleDeleteClick && handleDeleteClick()}
        >
          <TrashSimple className={tableActionIcon} />
          <Box as="span" className={tableActionTooltip}>
            {t('btns.delete')}
          </Box>
        </Button>
      </li>

      <li className={tableActionList}>
        <Button
          type="button"
          btnType="ghost"
          size="xs"
          variant="secondary"
          className="group relative"
          onClick={() => handleConfigureClick && handleConfigureClick()}
        >
          <Gear className={tableActionIcon} weight="fill" />
          <Box as="span" className={tableActionTooltip}>
            {t('btns.setting')}
          </Box>
        </Button>
      </li>
    </ul>
  )
}

export default TableAction
