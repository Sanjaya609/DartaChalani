import { useMutation } from "@tanstack/react-query";
import { RequestBodyType, RequestMethod } from "../../../../../schemas/apiActionSchema";
import performApiAction from "../../../../../utils/default-action";

const loginApi = {
    post: {
        queryKeyName: 'LOGIN',
        controllerName: '/api/oauth/token',
        requestMethod: RequestMethod.POST,
        requestBodyType: RequestBodyType.FORMDATA
    }
}

export interface LoginPostData {
    username: string;
    password: string;
    grant_type: string
}

export interface LoginResponse {
    "access_token": string,
    "token_type": string,
    "refresh_token": string,
    "expires_in": number,
    "scope": string
}

export const useLoginPost = () => {
    return useMutation(
        (requestData: LoginPostData) => {
            return performApiAction(loginApi.post, { requestData });
        }
    );
};