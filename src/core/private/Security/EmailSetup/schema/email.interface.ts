export interface IEmailInitialValue {
  id?: number
  email: string
  password: string
  port: number | string
  host: string
  properties: IProperty[]
}

interface IProperty {
  key: string
  value: string
}

export interface IEmailResponse extends IEmailInitialValue {}
