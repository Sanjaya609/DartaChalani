import * as Yup from 'yup'

export interface UpdateFirstPasswordFormSchema {
    currentPassword: string
    confirmNewPassword: string
    newPassword: string
}



export const UpdateFirstPasswordInitialValues: UpdateFirstPasswordFormSchema = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}

export const UpdateFirstPasswordValidationSchema = Yup.object().shape({
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
