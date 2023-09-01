import React from 'react';
import { publicRoutePath } from './publicRoutePath';

export interface RouteProperties {
    path?: string;
    element: React.ReactNode;
    children?: RouteProperties[];
}

const Login = React.lazy(() => import('../../core/public/auth/Login/Login'))
const Register = React.lazy(() => import('../../core/public/auth/Register/Register'))
const ForgetPassword = React.lazy(() => import('../../core/public/auth/ForgetPassword/ForgetPassword'))
const ChangePassword = React.lazy(() => import('../../core/public/auth/ChangePassword/ChangePassword'))
const ResetPassword = React.lazy(() => import('../../core/public/auth/ResetPassword/ResetPassword'))
const UpdatePassword = React.lazy(() => import('../../core/public/auth/UpdatePassword/UpdatePassword'))

const Auth = React.lazy(() => import('../../core/public/auth/Auth/Auth'))

export const publicRoutes: RouteProperties[] = [
    {
        path: publicRoutePath.base,
        element: <Auth />,
        children: [
            {
                path: publicRoutePath.login,
                element: <Login />
            },
            {
                path: publicRoutePath.register,
                element: <Register />
            },
            {
                path: publicRoutePath.changePassword,
                element: <ChangePassword />
            },
            {
                path: publicRoutePath.forgetPassword,
                element: <ForgetPassword />
            },
            {
                path: publicRoutePath.resetPassword,
                element: <ResetPassword />
            },
            {
                path: publicRoutePath.updatePassword,
                element: <UpdatePassword />
            }
        ]
    }
]