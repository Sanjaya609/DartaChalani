import FallbackLoader from '@/components/FallbackLoader'
import Switch from '@/components/functional/Form/Switch/Switch'
import { Flexbox, Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import {
  IModuleSetupTableData,
  IResourceRequestList,
} from '../../ModuleSetup/schema/moduleSetup.interface'
import {
  useCreateRoleMapping,
  useGetResourceListByModuleAndRole,
} from '../services/roleModuleMapping.query'
import useGetRoleMappingParamsData from './useGetRoleMappingParamsData'

interface IRoleModuleResourceListProps {
  selectedModule: IModuleSetupTableData | undefined
}

const RoleModuleResourceList = ({
  selectedModule,
}: IRoleModuleResourceListProps) => {
  const roleData = useGetRoleMappingParamsData()

  const {
    data: resourceListByModuleAndRole = [],
    isFetching: resourceListFetching,
  } = useGetResourceListByModuleAndRole({
    roleId: roleData?.id,
    moduleId: selectedModule?.id,
  })

  const { mutate: createRoleMapping } = useCreateRoleMapping()

  const handleRoleMappingCreateDelete = (resource: IResourceRequestList) => {
    if (roleData?.id && selectedModule?.id && resource.id) {
      createRoleMapping({
        moduleId: selectedModule.id,
        resourceId: +resource.id,
        showModuleOnMenu: true,
        roleId: +roleData.id,
      })
    }
  }

  return (
    <Grid.Col sm={'sm:col-span-9'}>
      <Flexbox className="h-full p-4" direction="column">
        <Text variant="h5" typeface="semibold" className="mb-2">
          Resource List
        </Text>

        <Card className="h-full w-full">
          <Flexbox className="h-full gap-4">
            {!resourceListFetching && !selectedModule ? (
              <>No Module Selected</>
            ) : resourceListFetching ? (
              <FallbackLoader />
            ) : resourceListByModuleAndRole?.length ? (
              resourceListByModuleAndRole?.map((resource) => (
                <Card borderColor="border-gray-96" bordered>
                  <Flexbox align="center">
                    <Text variant="h6" typeface="semibold" className="mr-2">
                      {resource.resourceName}
                    </Text>
                    <Switch
                      size={5}
                      onChange={() => {
                        handleRoleMappingCreateDelete(resource)
                      }}
                    />
                  </Flexbox>
                </Card>
              ))
            ) : (
              <>No Resource found</>
            )}
          </Flexbox>
        </Card>
      </Flexbox>
    </Grid.Col>
  )
}

export default RoleModuleResourceList
