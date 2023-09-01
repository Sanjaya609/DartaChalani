import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import performApiAction, { CustomResponse } from "../../../../utils/default-action";
import { RoleData } from "./schema";
import { RequestMethod } from "../../../../schemas/apiActionSchema";

const roleApi = {
    getAllRole: {
        queryKeyName: 'GET_ROLE',
        controllerName: '/api/role/list'
    },
    post: {
        queryKeyName: 'POST_ROLE',
        controllerName: '/api/role',
        requestMethod: RequestMethod.POST,
    },
    activeStatus: {
        queryKeyName: 'POST_ROLE_STATUS',
        controllerName: '/api/role/{id}',
        requestMethod: RequestMethod.PUT,
    },
    getById: {
        queryKeyName: 'GET_ROLE_BY_ID',
        controllerName: '/api/role/{roleId}',
    }
}
export const useRolesData = () =>
    useQuery(
        [roleApi.getAllRole],
        () =>
            performApiAction<CustomResponse<RoleData[]>>(roleApi.getAllRole),
    );

export const useRolePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (requestData: RoleData) => {
            return performApiAction(roleApi.post, { requestData });
        }, {
        onSuccess(data) {
            if (data.data) {
                queryClient.invalidateQueries([roleApi.getAllRole])
            }
        },
    }
    );
};

export const useRoleByIdData = (roleId: number) =>
    useQuery(
        [roleApi.getById, roleId],
        () =>
            performApiAction<CustomResponse<RoleData>>(roleApi.getById, {
                pathVariables: { roleId }
            }), {
        enabled: !!roleId
    }
    );

export const UseRoleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: number) => {
            return performApiAction(
                roleApi.activeStatus,
                { pathVariables: { id } }
            );
        },
        {
            onSuccess(data) {
                if (data.data) {
                    queryClient.invalidateQueries([
                        roleApi.getAllRole,
                    ]);
                }
            },
        }
    );
};
