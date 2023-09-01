import { useMutation } from "@tanstack/react-query";
import { RequestBodyType, RequestMethod } from "../../../../schemas/apiActionSchema";
import performApiAction from "../../../../utils/default-action";
import { ChangePasswordPayload } from "./changePassword.schema";



export const changePasswordAPI = {
  changePassword: {
    queryKeyName: "CHANGE_PASSWORD",
    controllerName: "/api/user/forgot-password",
    requestMethod: RequestMethod.POST,
    requestBodyType: RequestBodyType.NOAUTH
  },
};


export const UseChangePassword = () => {
  return useMutation(
    (requestData: ChangePasswordPayload) => {
      return performApiAction(changePasswordAPI.changePassword, {
        requestData,
      });
    },
  );
};
