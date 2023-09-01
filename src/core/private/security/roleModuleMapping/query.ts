import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import performApiAction, { CustomResponse } from "../../../../utils/default-action";
import { RequestMethod } from "../../../../schemas/apiActionSchema";
import { RoleModulePrivilegePayload, RoleModulePrivilegeReponse } from "./schema";

const moduleApi = {
    getAll: {
        queryKeyName: 'GET_ROLE_MODULE_ALL',
        controllerName: '/api/role-module-privilege/role/{roleId}'
    },
    post: {
        queryKeyName: 'POST_ROLE_MODULE',
        controllerName: '/api/role-module-privilege',
        requestMethod: RequestMethod.POST,
    }
}
export const useRoleModuleMappingData = (roleId: number) =>
    useQuery(
        [moduleApi.getAll, roleId],
        () =>
            performApiAction<CustomResponse<RoleModulePrivilegeReponse>>(moduleApi.getAll,{
                pathVariables:{roleId}
            }), {
        enabled: !!roleId
    }
    );


export const useRoleModuleMappingPost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (requestData: RoleModulePrivilegePayload) => {
            return performApiAction(moduleApi.post, { requestData });
        }, {
        onSuccess(data) {
            if (data.data) {
                queryClient.invalidateQueries([moduleApi.getAll])
            }
        },
    }
    );
};
