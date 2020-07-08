import fetch from 'node-fetch'
import { Parameter } from './types'
import { makeSystemParameters } from './signature'

export class LazopClient {
  endpoint: string
  appKey: string
  appSecret: string

  constructor(endpoint: string, appKey: string, appSecret: string) {
    this.endpoint = endpoint
    this.appKey = appKey
    this.appSecret = appSecret
  }

  async get(path: string, params: Parameter, accessToken?: string) {
    const qs = Object.entries({
      ...params,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken, params)
    })
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')

    return await fetch(this.endpoint + path + '?' + qs, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async post(path: string, body: Parameter, accessToken?: string) {
    const qs = {
      ...body,
      ...makeSystemParameters(this.appKey, this.appSecret, path, accessToken, body)
    }

    return await fetch(this.endpoint + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(qs)
    })
  }
}
