import 'i18next'
import { TFunction } from 'i18next'
import { resources } from './resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof resources.en
  }
}

type Translation = TFunction<'translation', undefined, 'translation'>
