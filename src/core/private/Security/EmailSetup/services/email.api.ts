import { RequestMethod } from '@/lib/api-request'

const prefix = '/email-credentials'

const emailSetupAPI = {
  createEmailSetup: {
    controllerName: `${prefix}`,
    queryKeyName: 'CREATE_EMAIL_SETUP',
    requestMethod: RequestMethod.POST,
  },
  getEmailSetup: {
    controllerName: `${prefix}`,
    queryKeyName: 'GET_EMAIL_SETUP',
    requestMethod: RequestMethod.GET,
  },
}

export default emailSetupAPI
