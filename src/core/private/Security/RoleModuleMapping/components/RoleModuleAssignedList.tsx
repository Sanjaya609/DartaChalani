import Form from '@/components/functional/Form/Form'
import { Box, Flexbox, Grid, Layout } from '@/components/ui'
import Modal from '@/components/ui/Modal/Modal'
import { Text } from '@/components/ui/core/Text'
import {
  useGetConfigurableModuleList,
  useGetDynamicFormModuleList,
} from '@/core/private/Security/ModuleSetup/services/moduleSetup.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IModuleSetupTableData } from '../../ModuleSetup/schema/moduleSetup.interface'
import {
  useDeleteRoleMapping,
  useGetAssignedModulesForRole,
} from '../services/roleModuleMapping.query'
import useGetRoleMappingParamsData from './useGetRoleMappingParamsData'

interface IRoleModuleAssignedListProps {
  setSelectedModule: Dispatch<SetStateAction<IModuleSetupTableData | undefined>>
  selectedModule?: IModuleSetupTableData
}

const RoleModuleAssignedList = ({
  setSelectedModule,
  selectedModule,
}: IRoleModuleAssignedListProps) => {
  const { t } = useTranslation()
  const [assignedModuleListData, setAssignedModuleListData] = useState<
    IModuleSetupTableData[]
  >([])
  const [currentSelectedId, setCurrentSelectedId] = useState<null | number>(
    null
  )

  const roleData = useGetRoleMappingParamsData()
  const { data: moduleList = [] } = useGetConfigurableModuleList<OptionType[]>({
    mapDatatoStyleSelect: true,
  })
  const { data: dynamicFormModuleList = [] } = useGetDynamicFormModuleList<
    OptionType[]
  >(true, { mapDatatoStyleSelect: true })

  const { data: assignedModuleList = [] } = useGetAssignedModulesForRole({
    roleId: roleData?.id,
  })

  const { mutate: deleteRoleMapping, isLoading: deleteRoleMappingLoading } =
    useDeleteRoleMapping({ invalidateResourceList: false })

  useEffect(() => {
    if (assignedModuleList) {
      setAssignedModuleListData(assignedModuleList as IModuleSetupTableData[])

      if (selectedModule && assignedModuleList?.length) {
        setSelectedModule(
          assignedModuleList?.find((module) => selectedModule.id === module.id)
        )
      }
    }
  }, [assignedModuleList])

  const nonAssignedModuleList = useMemo(
    () =>
      [...moduleList, ...dynamicFormModuleList].filter(
        (module) =>
          !assignedModuleListData
            ?.map((assignList) => +assignList.id)
            .includes(+module.value)
      ),
    [assignedModuleListData, moduleList, dynamicFormModuleList]
  )

  const setOrRemoveCurrentSelectedId = (id?: number) =>
    setCurrentSelectedId(id || null)

  const deleteRoleMappingCreateDelete = () => {
    if (roleData?.id && currentSelectedId) {
      deleteRoleMapping(
        {
          moduleId: +currentSelectedId,
          roleId: roleData?.id,
          removeModuleAlso: true,
        },
        {
          onSuccess: () => {
            setSelectedModule(undefined)
            setCurrentSelectedId(null)
          },
        }
      )
    }
  }

  const removeFromModuleList = (id: number) => {
    if (selectedModule && id === selectedModule.id) {
      setSelectedModule(undefined)
    }
    setAssignedModuleListData(
      assignedModuleListData.filter((module) => module.id !== id)
    )
  }

  return (
    <Grid.Col sm={'sm:col-span-3'}>
      <Flexbox className="h-full p-4" direction="column">
        <Text variant="h5" typeface="semibold" className="mb-2">
          {t('security.roleModuleMapping.modules')}
        </Text>

        <Form.Select
          name="searchedModule"
          wrapperClassName="w-full mb-3"
          value={''}
          placeholder="Select Module..."
          options={nonAssignedModuleList}
          onChange={(e) => {
            setAssignedModuleListData((prev) => [
              e.value as unknown as IModuleSetupTableData,
              ...prev,
            ])
            setSelectedModule(e.value as unknown as IModuleSetupTableData)
          }}
        />
        <Flexbox className="relative w-full grow">
          <Layout.Absolute scrollable>
            {assignedModuleListData?.length ? (
              assignedModuleListData?.map((module) => {
                return (
                  <Box
                    onClick={() => {
                      setSelectedModule(module)
                    }}
                    className={`my-1 flex  cursor-pointer items-center justify-between rounded-[2px] bg-gray-96 p-2 ${
                      selectedModule && +selectedModule.id !== +module.id
                        ? 'hover:bg-gray-88'
                        : ''
                    } ${
                      selectedModule && +selectedModule?.id === +module.id
                        ? 'bg-white'
                        : ''
                    }`}
                  >
                    <Text variant="h6">
                      {getTextByLanguage(
                        module?.moduleNameEnglish,
                        module?.moduleNameNepali
                      )}
                    </Text>
                    <Box
                      onClick={(event: any) => {
                        event.stopPropagation()
                        if ('showModuleOnMenu' in module) {
                          setCurrentSelectedId(module.id)
                        } else {
                          removeFromModuleList(module.id)
                        }
                      }}
                      className="group cursor-pointer rounded p-2 transition-colors hover:bg-red-40 "
                    >
                      <Trash2
                        onClick={(e) => {}}
                        className="text-red-40 group-hover:text-white"
                        size={18}
                      />
                    </Box>
                  </Box>
                )
              })
            ) : (
              <>{t('security.roleModuleMapping.noAssignedModule')}</>
            )}
          </Layout.Absolute>
        </Flexbox>
      </Flexbox>
      <Modal
        open={!!currentSelectedId}
        toggleModal={setOrRemoveCurrentSelectedId}
        size="md"
        title={t('security.roleModuleMapping.removeModule')}
        saveBtnProps={{
          btnAction: deleteRoleMappingCreateDelete,
          loading: deleteRoleMappingLoading,
        }}
      >
        {t('security.roleModuleMapping.unassignedModule')}
      </Modal>
    </Grid.Col>
  )
}

export default RoleModuleAssignedList
