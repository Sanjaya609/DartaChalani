import 'yup'

declare module 'yup' {
  interface ArraySchema {
    uniqueProperty(message?: string, string): ArraySchema
  }

  interface StringSchema {
    noSpacesInput(message?: string): StringSchema
  }

  interface StringSchema {
    isValidPhoneNumber(message?: string): StringSchema
  }

  interface CustomTransProps {
    message?: string
    translateKey?: Record<string, string>
  }

  interface StringSchema {
    isRequired(props?: CustomTransProps): StringSchema
  }
}
