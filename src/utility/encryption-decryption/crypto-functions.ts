import CryptoJS from 'crypto-js'

export const secret_key =
  'dara_chalani_|@NcRfUjXn2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh'

export const encrypt = (data: TAny, secretKey?: string): string => {
  const payload = typeof data === 'object' ? JSON.stringify(data) : data
  return CryptoJS.AES.encrypt(payload, secretKey || secret_key).toString()
}

export const decrypt = (data: string, secretKey?: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey || secret_key)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}

export const maskAccountNumber = (accNumber?: string | number) => {
  const decryptedAccNumber = accNumber ? decrypt(`${accNumber}`) : '**********'
  const accountNumber = decryptedAccNumber.replace(/\d(?=\d{4})/g, '*')

  return accountNumber
}
