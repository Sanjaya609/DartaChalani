import { getToken } from "./tokenService";

interface TokenResponse {
    aud: string[]
    user_name: string
    roleId: number
    scope: string[]
    userType: string
    exp: number
    userId: number
    authorities: string[]
    jti: string
    client_id: string
    username: string
    isPasswordChanged: boolean
}

export function parseJwt(token = getToken()): TokenResponse | null {
    try {
        if (token) {
            const base64Url: string = token.split('.')[1];
            const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload: string = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
        return null
    } catch (error) {
        return null
    }
};