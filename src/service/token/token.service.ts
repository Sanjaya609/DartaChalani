import {
  decrypt,
  encrypt,
} from '@/utility/encryption-decryption/crypto-functions'

interface AuthTokenService {
  setToken: (token: string) => void
  getAccessToken: () => TAny
  getRefreshToken: () => string
  clearToken: () => void
  setRefeshToken: (token: TAny) => void
  clearUserTypeTokenFromLocalStorage: () => void
}

const [at, rt, ud, ut] = [
  btoa(btoa('access_token')),
  btoa(btoa('refresh_token')),
  btoa(btoa('user_detail')),
  btoa(btoa('user_type')),
]

function clearToken() {
  localStorage.removeItem(at)
  localStorage.removeItem(rt)
  localStorage.removeItem(ud)
  dispatchEvent(new Event('storage'))
}

function clearUserTypeTokenFromLocalStorage() {
  localStorage.removeItem(ut)
}

const encodeToken = (token: string) => {
  try {
    const tokenWithBrowserData = JSON.stringify({ tkvrt: token })
    const tokenWithBrowserDataEncoded = btoa(tokenWithBrowserData)
    const tokenWithBrowserDataEncodedSplit = [
      tokenWithBrowserDataEncoded.substring(0, 20),
      tokenWithBrowserDataEncoded.substring(20),
    ]
      .reverse()
      .join('')

    return encrypt(tokenWithBrowserDataEncodedSplit)
  } catch (e) {
    console.log('Error encoding token', e)
    return token
  }
}

const decodeToken = (token: string) => {
  if (!token) return ''

  try {
    const decryptedAES = decrypt(token)
    const tokenWithBrowserDataEncodedSplit = [
      decryptedAES.substring(0, decryptedAES.length - 20),
      decryptedAES.substring(decryptedAES.length - 20),
    ]
      .reverse()
      .join('')

    const tokenWithBrowserData = atob(tokenWithBrowserDataEncodedSplit)
    const { tkvrt } = JSON.parse(tokenWithBrowserData)

    return tkvrt
  } catch (e) {
    console.log('Error decoding token', e)
    clearToken()
    return token
  }
}

function setToken(tokenObj: TAny) {
  try {
    localStorage.setItem(at, encodeToken(tokenObj))
    // Where you set your localStorage item, if you dispatch an event at the same time then the eventListener in the same browser tab (no need to open another or mess with state) will also pick it up
    dispatchEvent(new Event('storage'))
  } catch (e) {
    console.log('Local Store error', e)
  }
}

function getAccessToken(): string {
  let accessToken = ''
  try {
    accessToken = decodeToken(localStorage.getItem(at) || '')
  } catch (e) {
    console.log('Local Store error', e)
  }
  return accessToken
}

function getRefreshToken(): string {
  let refreshToken = ''
  try {
    refreshToken = decodeToken(localStorage.getItem(rt) || '')
  } catch (e) {
    console.log('Local Store error', e)
  }
  return refreshToken
}

function setRefeshToken(tokenObj: TAny) {
  try {
    localStorage.setItem(rt, encodeToken(tokenObj))
  } catch (e) {
    console.log('Local Store error', e)
  }
}

function getUserDetails(): TAny {
  let userDetails
  try {
    userDetails = decodeToken(localStorage.getItem(ud) || '')
  } catch (e) {
    console.log('Local Store error', e)
  }
  return userDetails
}

function setUserDetails(obj: TAny) {
  try {
    localStorage.setItem(ud, encodeToken(obj))
  } catch (e) {
    console.log('Local Store error', e)
  }
}

const TokenService: AuthTokenService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  clearToken,
  setRefeshToken,
  clearUserTypeTokenFromLocalStorage,
}
export default TokenService
