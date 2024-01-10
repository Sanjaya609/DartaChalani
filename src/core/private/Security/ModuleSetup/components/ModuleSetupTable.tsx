import Switch from '@/components/functional/Form/Switch/Switch'
import { DataTable } from '@/components/functional/Table'
import TableAction from '@/components/functional/Table/Components/Table/TableAction'
import Modal from '@/components/ui/Modal/Modal'
import { useBoolean } from '@/hooks'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IModuleSetupFormSchema,
  IModuleSetupTableData,
} from '../schema/moduleSetup.interface'
import { moduleSetupInitialValues } from '../schema/moduleSetup.schema'
import {
  useChangeModuleStatus,
  useGetAllModule,
} from '../services/moduleSetup.query'
import ModuleSetupForm from './ModuleSetupForm'

const ModuleSetupTable = () => {
  const { t } = useTranslation()
  const [initialValues, setInitialValues] = useState(moduleSetupInitialValues)

  const { data: moduelList } = useGetAllModule()
  const { value: isOpenAddEditModal, toggle: toggleAddEditModal } = useBoolean()

  const setInitialValuesfromGivenValue = (values: IModuleSetupTableData) => {
    const {
      id,
      moduleNameEnglish,
      moduleNameNepali,
      description,
      code,
      url,
      iconClass,
      isConfigurable,
      orderNumber,
      parentModuleId,
      resourceResponses,
      dynamicField,
    } = values

    setInitialValues({
      id,
      moduleNameEnglish,
      moduleNameNepali,
      description,
      code,
      url,
      iconClass,
      isConfigurable,
      orderNumber,
      parentModuleId,
      resourceRequestList: resourceResponses?.length
        ? resourceResponses.map(
            ({ httpMethod, privilege, resourceName, url, id }) => ({
              id,
              httpMethod,
              privilege,
              resourceName,
              url,
            })
          )
        : [
            {
              httpMethod: '',
              privilege: '',
              resourceName: '',
              url: '',
            },
          ],
      dynamicFormApplicable: dynamicField,
    })
  }

  const { mutate: changeModuleStatus, isLoading: changeModuleStatusLoading } =
    useChangeModuleStatus()
  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )
  const columns = React.useMemo<ColumnDef<IModuleSetupTableData>[]>(
    () => [
      {
        accessorKey: 'code',
        header: t('security.module.code'),
      },
      {
        accessorKey: 'moduleNameEnglish',
        header: t('security.module.moduleNameEnglish'),
      },

      {
        accessorKey: 'moduleNameNepali',
        header: t('security.module.moduleNameNepali'),
      },
      {
        accessorKey: 'parentModule',
        header: t('security.module.parentModuleName'),
      },
      {
        accessorKey: 'orderNumber',
        header: t('security.module.orderNumber'),
      },
      {
        accessorKey: 'isActive',
        header: t('security.module.status'),
        cell: ({ row: { original } }) => (
          <Switch
            checked={original.isActive}
            onChange={() => {
              setOrRemoveCurrentSelectedId(original.id)
            }}
          />
        ),
      },

      {
        header: t('actions'),
        sticky: 'right',
        id: 'action',
        cell: ({ row: { original } }) => {
          return (
            <TableAction
              handleEditClick={() => {
                setInitialValuesfromGivenValue(original)
                toggleAddEditModal()
              }}
            />
          )
        },
      },
    ],
    [t]
  )
  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)
  const handleChangeStatus = () => {
    if (currentSelectedId) {
      changeModuleStatus(
        { moduleId: currentSelectedId },
        {
          onSuccess: () => {
            setOrRemoveCurrentSelectedId()
          },
        }
      )
    }
  }

  return (
    <>
      <DataTable
        canSearch
        addHeaderProps={{
          handleAdd: () => {
            toggleAddEditModal()
          },
        }}
        className="pb-4"
        columns={columns}
        data={moduelList || []}
      />
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('masterSetup.fiscalYear.modal.status.title')}
        saveBtnProps={{
          btnAction: handleChangeStatus,
          loading: changeModuleStatusLoading,
        }}
      >
        {t('masterSetup.fiscalYear.modal.status.description')}
      </Modal>

      <ModuleSetupForm
        isOpenAddEditModal={isOpenAddEditModal}
        toggleAddEditModal={toggleAddEditModal}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
    </>
  )
}

export default ModuleSetupTable
