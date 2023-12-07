import { masterAPIs } from '@/core/private/MasterSetup/services/mastersetup.api'
import { securityAPI } from '@/core/private/Security/services/security.api'
import oauthAPI from '@/service/oauth/oauth'
import genericAPI from '@/service/generic'
import registrationBookAPI from '@/core/private/RegistrationBook/AddRegistrationBook/services/add-registration-book.api'
import standingListAPI from '@/core/private/StandingList/AddStandingList/services/standing-list.api'
import dispatchBookAPI from '@/core/private/DispatchBook/AddDispatchBook/services/add-dispatch-book.api'
import recommendationAPI from '@/core/private/Recommendation/AddRecommendation/services/add-recommendation.api'

export const apiDetails = {
  oauthAPI,
  ...masterAPIs,
  ...securityAPI,
  ...genericAPI,
  ...registrationBookAPI,
  ...standingListAPI,
  ...dispatchBookAPI,
  ...recommendationAPI
}
