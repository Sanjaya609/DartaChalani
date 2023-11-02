import Form from '@/components/functional/Form/Form'
import { Box, Flexbox, Grid, Layout } from '@/components/ui'
import { Text } from '@/components/ui/core/Text'
import { useGetConfigurableModuleList } from '@/core/private/Security/ModuleSetup/services/moduleSetup.query'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { Trash2 } from 'lucide-react'
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { IModuleSetupTableData } from '../../ModuleSetup/schema/moduleSetup.interface'
import { useGetAssignedModulesForRole } from '../services/roleModuleMapping.query'
import useGetRoleMappingParamsData from './useGetRoleMappingParamsData'
import { e } from 'vitest/dist/index-5aad25c1'

interface IRoleModuleAssignedListProps {
  setSelectedModule: Dispatch<SetStateAction<IModuleSetupTableData | undefined>>
  selectedModule?: IModuleSetupTableData
}

const RoleModuleAssignedList = ({
  setSelectedModule,
  selectedModule,
}: IRoleModuleAssignedListProps) => {
  const [assignedModuleListData, setAssignedModuleListData] = useState<
    IModuleSetupTableData[]
  >([])

  const roleData = useGetRoleMappingParamsData()
  const { data: moduleList = [] } = useGetConfigurableModuleList<OptionType[]>({
    mapDatatoStyleSelect: true,
  })

  const { data: assignedModuleList = [] } = useGetAssignedModulesForRole({
    roleId: roleData?.id,
  })

  useEffect(() => {
    if (assignedModuleList) {
      setAssignedModuleListData(assignedModuleList as IModuleSetupTableData[])
    }
  }, [assignedModuleList])

  const nonAssignedModuleList = useMemo(
    () =>
      moduleList.filter(
        (module) =>
          !assignedModuleListData
            ?.map((assignList) => +assignList.id)
            .includes(+module.value)
      ),
    [assignedModuleListData]
  )

  return (
    <Grid.Col sm={'sm:col-span-3'}>
      <Flexbox className="h-full p-4" direction="column">
        <Text variant="h5" typeface="semibold" className="mb-2">
          Modules
        </Text>

        <Form.Select
          name="searchedModule"
          wrapperClassName="w-full mb-3"
          value={''}
          placeholder="Select Module..."
          options={nonAssignedModuleList}
          onChange={(e) => {
            setAssignedModuleListData((prev) => [
              ...prev,
              e.value as unknown as IModuleSetupTableData,
            ])
            setSelectedModule(e.value as unknown as IModuleSetupTableData)
          }}
        />
        <Flexbox className="relative w-full grow">
          <Layout.Absolute scrollable>
            {assignedModuleListData?.map((module) => {
              return (
                <Box
                  onClick={() => {
                    setSelectedModule(module)
                  }}
                  className={`my-1 flex  cursor-pointer items-center justify-between rounded-[2px] bg-gray-96 p-2 hover:bg-gray-88 ${
                    selectedModule && +selectedModule?.id === +module.id
                      ? 'bg-white'
                      : ''
                  } `}
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
            })}
          </Layout.Absolute>
        </Flexbox>
      </Flexbox>
    </Grid.Col>
  )
}

export default RoleModuleAssignedList
