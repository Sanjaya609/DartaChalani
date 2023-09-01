import * as Yup from 'yup'
export interface ChangePasswordPayload {
    confirmNewPassword: string
    newPassword: string
    token: string | null
}

export interface ChangePasswordFormSchema {
    confirmNewPassword: string
    newPassword: string
}



export const ChangePasswordInitialValues: ChangePasswordFormSchema = {
    newPassword: "",
    confirmNewPassword: ""
}

export const ChangePasswordFormValidation = Yup.object().shape({
    newPassword: Yup.string().required('updatePassword.validation.newPassword'),
    confirmNewPassword: Yup.string().required('updatePassword.validation.confirmPassword').test(
        'newPassword',
        `updatePassword.validation.samePassword`,
        function () {
            return this.parent.newPassword === this.parent.confirmNewPassword
        }
    )
})
