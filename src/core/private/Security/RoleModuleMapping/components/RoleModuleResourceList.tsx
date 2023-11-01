import FallbackLoader from '@/components/FallbackLoader'
import Switch from '@/components/functional/Form/Switch/Switch'
import { Flexbox, Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { Spinner } from '@/components/ui/Spinner'
import { decodeParams } from '@/utility/route-params'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
  IModuleSetupTableData,
  IResourceRequestList,
} from '../../ModuleSetup/schema/moduleSetup.interface'
import {
  useCreateRoleMapping,
  useGetResourceListByModuleAndRole,
} from '../services/roleModuleMapping.query'
import { IRoleDataParams } from './RoleModuleAssignedList'

interface IRoleModuleResourceListProps {
  selectedModule: IModuleSetupTableData | undefined
}

const RoleModuleResourceList = ({
  selectedModule,
}: IRoleModuleResourceListProps) => {
  const params = useParams()
  const roleData = useMemo<IRoleDataParams>(
    () => (decodeParams(params.roleData) as IRoleDataParams) || null,
    []
  )
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
          Modules
        </Text>

        <Card className="h-full w-full">
          <Flexbox className="h-full gap-4">
            {resourceListFetching ? (
              <FallbackLoader />
            ) : (
              resourceListByModuleAndRole?.map((resource) => (
                <Card>
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
            )}
          </Flexbox>
        </Card>
      </Flexbox>
    </Grid.Col>
  )
}

export default RoleModuleResourceList
