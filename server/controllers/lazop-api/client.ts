import fetch from 'node-fetch'
import { Parameter } from './types'
import { makeSystemParameters } from './signature'

export class LazopClient {
  endpoint: string
  appKey: string
  appSecret: string
  accessToken: string

  constructor(endpoint: string, appKey: string, appSecret: string) {
    this.endpoint = endpoint
    this.appKey = appKey
    this.appSecret = appSecret
  }

  async getAccessToken() {
    if (!this.accessToken) {
      var token = await this.generateAccessToken()
      this.accessToken = token.accessToken
      console.log('\n\n\n\n\n\n\n\naccessToken', token)
    }

    return this.accessToken
  }

  async get(path: string, params: Parameter, accessToken?: string) {
    if (!accessToken) {
      accessToken = await this.getAccessToken()
    }

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
    if (!accessToken) {
      accessToken = await this.getAccessToken()
    }

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

  async generateAccessToken() {
    const path = '/auth/token/create'
    const endpoint = 'https://auth.lazada.com/rest'

    const payload = {
      code: '124968727189041'
      // unique identifier, anti-replay
      // uuid: 'xxxx'
    }

    const qs = {
      ...payload,
      ...makeSystemParameters(this.appKey, this.appSecret, path, undefined, payload)
    }

    var response = await fetch(endpoint + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(qs)
    })

    return await response.json()
  }

  async refreshAccessToken() {
    const path = '/auth/token/refresh'
    const endpoint = 'https://auth.lazada.com/rest'

    const payload = {
      refresh_token: this.accessToken
    }

    const qs = {
      ...payload,
      ...makeSystemParameters(this.appKey, this.appSecret, path, undefined, payload)
    }

    var response = await fetch(endpoint + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(qs)
    })

    return await response.json()
  }
}
