import * as Yup from 'yup'

export interface UpdatePasswordFormSchema {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

export const UpdatePasswordFormInitialValues: UpdatePasswordFormSchema = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}

export const UpdatePasswordFormValidation = Yup.object().shape({
    currentPassword: Yup.string().required('updatePassword.validation.currentPassword'),
    newPassword: Yup.string().required('updatePassword.validation.newPassword'),
    confirmNewPassword: Yup.string().required('updatePassword.validation.confirmPassword').test(
        'newPassword',
        `updatePassword.validation.samePassword`,
        function () {
            return this.parent.newPassword === this.parent.confirmNewPassword
        }
    )
})

export interface UpdatePasswordPayload {
    confirmNewPassword: string
    currentPassword: string
    newPassword: string
    token: string | null
}