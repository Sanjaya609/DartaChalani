import FallbackLoader from '@/components/FallbackLoader'
import Switch from '@/components/functional/Form/Switch/Switch'
import { Flexbox, Grid } from '@/components/ui'
import { Card } from '@/components/ui/core/Card'
import { Text } from '@/components/ui/core/Text'
import { getTextByLanguage } from '@/lib/i18n/i18n'
import { useTranslation } from 'react-i18next'
import {
  IModuleSetupTableData,
  IResourceRequestList,
} from '../../ModuleSetup/schema/moduleSetup.interface'
import {
  useCreateRoleMapping,
  useDeleteRoleMapping,
  useGetResourceListByModuleAndRole,
} from '../services/roleModuleMapping.query'
import useGetRoleMappingParamsData from './useGetRoleMappingParamsData'

interface IRoleModuleResourceListProps {
  selectedModule: IModuleSetupTableData | undefined
}

const RoleModuleResourceList = ({
  selectedModule,
}: IRoleModuleResourceListProps) => {
  const { t } = useTranslation()
  const roleData = useGetRoleMappingParamsData()

  const {
    data: resourceListByModuleAndRole = [],
    isFetching: resourceListFetching,
  } = useGetResourceListByModuleAndRole({
    roleId: roleData?.id,
    moduleId: selectedModule?.id,
  })

  const { mutate: createRoleMapping } = useCreateRoleMapping()

  const { mutate: deleteRoleMapping } = useDeleteRoleMapping({
    invalidateAssignedModule: false,
  })

  const handleRoleMappingCreateDelete = (
    showModuleOnMenu: boolean,
    refetchResourceList = true,
    resource?: IResourceRequestList
  ) => {
    if (roleData?.id && selectedModule?.id) {
      createRoleMapping({
        moduleId: selectedModule.id,
        resourceId: resource?.id ? +resource.id : undefined,
        showModuleOnMenu,
        roleId: +roleData.id,
        refetchResourceList,
      })
    }
  }

  const deleteRoleMappingCreateDelete = (resource: IResourceRequestList) => {
    if (roleData?.id && selectedModule?.id) {
      deleteRoleMapping({
        moduleId: +selectedModule.id,
        roleId: roleData?.id,
        removeModuleAlso: true,
        resourceId: resource.id,
      })
    }
  }

  return (
    <Grid.Col sm={'sm:col-span-9'}>
      <Flexbox className="h-full p-4" direction="column">
        <Flexbox align="center" className="mb-3 ">
          <Text variant="h5" typeface="semibold" className="mr-3">
            {t('security.roleModuleMapping.resourcesList')}{' '}
            {selectedModule
              ? `(${getTextByLanguage(
                  selectedModule.moduleNameEnglish,
                  selectedModule.moduleNameNepali
                )})`
              : ''}
          </Text>

          {selectedModule && (
            <Switch
              checked={!!selectedModule?.showModuleOnMenu}
              size={5}
              onChange={() => {
                handleRoleMappingCreateDelete(
                  !selectedModule?.showModuleOnMenu,
                  false
                )
              }}
            />
          )}
        </Flexbox>

        <Card className="h-full w-full">
          <Flexbox className="h-full gap-4">
            {!resourceListFetching && !selectedModule ? (
              <>{t('security.roleModuleMapping.noModuleSelect')}</>
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
                      checked={!!resource.isAssignedToRole}
                      size={5}
                      onChange={() => {
                        if (!resource.isAssignedToRole) {
                          handleRoleMappingCreateDelete(
                            !resource.isAssignedToRole,
                            true,
                            resource
                          )
                        } else {
                          deleteRoleMappingCreateDelete(resource)
                        }
                      }}
                    />
                  </Flexbox>
                </Card>
              ))
            ) : (
              <>{t('security.roleModuleMapping.noResourceList')}</>
            )}
          </Flexbox>
        </Card>
      </Flexbox>
    </Grid.Col>
  )
}

export default RoleModuleResourceList
