import { useMutation } from "@tanstack/react-query";
import { RequestBodyType, RequestMethod } from "../../../schemas/apiActionSchema";
import performApiAction from "../../../utils/default-action";
import { UpdatePasswordPayload } from "./updatePassword.schema";


export const updatePasswordAPI = {
  changePassword: {
    queryKeyName: "UPDATE_PASSWORD",
    controllerName: "/api/user/change-password",
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.AUTH
  },
};


export const useUpdatePassword = () => {
  return useMutation(
    (requestData: UpdatePasswordPayload) => {
      return performApiAction(updatePasswordAPI.changePassword, {
        requestData,
      });
    },
  );
};
