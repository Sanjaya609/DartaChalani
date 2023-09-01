import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import performApiAction, { CustomResponse } from "../../../../utils/default-action";
import { RequestMethod } from "../../../../schemas/apiActionSchema";
import { ModuleSchema, ModuleSchemaResponse } from "./schema";

const moduleApi = {
    getAll: {
        queryKeyName: 'GET_MODULE_ALL',
        controllerName: '/api/module/list'
    },
    getAllActive: {
        queryKeyName: 'GET_MODULE_ACTIVE',
        controllerName: '/api/module/list/true'
    },
    post: {
        queryKeyName: 'POST_MODULE',
        controllerName: '/api/module',
        requestMethod: RequestMethod.POST,
    },
    activeStatus: {
        queryKeyName: 'POST_MODULE_STATUS',
        controllerName: '/api/module/{id}',
        requestMethod: RequestMethod.PUT,
    },
    getAllConfigurable: {
        queryKeyName: 'GET_ALL_CONFIGURABLE',
        controllerName: '/api/module/configurable-list'
    }
}
export const useModuleData = () =>
    useQuery(
        [moduleApi.getAll],
        () =>
            performApiAction<CustomResponse<ModuleSchemaResponse[]>>(moduleApi.getAll),
    );

export const useActiveModuleData = () =>
    useQuery(
        [moduleApi.getAllActive],
        () =>
            performApiAction<CustomResponse<ModuleSchemaResponse[]>>(moduleApi.getAllActive),
    );

export const useAllConfigutModuleData = () =>
    useQuery(
        [moduleApi.getAllConfigurable],
        () =>
            performApiAction<CustomResponse<ModuleSchemaResponse[]>>(moduleApi.getAllConfigurable),
    );

export const useModulePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (requestData: ModuleSchema) => {
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

export const UseModuleStatus = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (id: number) => {
            return performApiAction(
                moduleApi.activeStatus,
                { pathVariables: { id } }
            );
        },
        {
            onSuccess(data) {
                if (data.data) {
                    queryClient.invalidateQueries([
                        moduleApi.getAll
                    ]);
                }
            },
        }
    );
};
