export const Endpoint = {
  SINGAPORE: 'https://api.lazada.sg/rest',
  THAILAND: 'https://api.lazada.co.th/rest',
  MALAYSIA: 'https://api.lazada.com.my/rest',
  VIETNAM: 'https://api.lazada.vn/rest',
  PHILIPPINES: 'https://api.lazada.com.ph/rest',
  INDONESIA: 'https://api.lazada.co.id/rest',
  AUTH: 'https://auth.lazada.com/rest'
}

export type Parameter = {
  [key: string]: any
}

/**
 * Lazada Open Platform System Parameters
 * @typedef SystemParameters
 * @property {string} app_key :mandatory
 * @property {string} access_token :conditional
 * @property {string} timestamp :mandatory
 * @property {string} sign_method :mandatory 'sha256'
 * @property {string} sign :mandatory
 */
export interface SystemParameters {
  app_key: string
  timestamp: string
  access_token?: string
  sign_method: string
  sign: string
}

/**
 * Lazada API success response object
 * @typedef LazopActionResponseSuccess
 * @property {string} request_id hash id
 * @property {string} code should always == "0"
 * @property {Object} data
 */
export type LazopActionResponseSuccess = {
  request_id: string
  code: '0'
  data: any
}

/**
 * Lazada API error response object
 * @typedef LazopActionResponseError
 * @property {string} request_id hash id
 * @property {string} code non "0" value
 * @property {string} type SYSTEM (API platform error), ISV (Business data error), ISP (Backend service error)
 * @property {string} message error message
 */
type LazopActionErrorType = 'SYSTEM' | 'ISV' | 'ISP'
export type LazopActionResponseError = {
  request_id: string
  code: string
  type: LazopActionErrorType | string
  message: string
}

export type LazopActionResponse = LazopActionResponseSuccess | LazopActionResponseError

export type LazopAction = (
  appKey: string, // require for signing
  appSecret: string, // require for signing
  endpoint: string, // location specific gateway
  accessToken: string | undefined, // for all actions that require authorization
  payload: any // parameters
) => Promise<LazopActionResponse>
