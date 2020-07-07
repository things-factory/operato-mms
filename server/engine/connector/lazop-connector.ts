import { Connections, Connector } from '@things-factory/integration-base'
// import { LazopClient } from '@things-factory/lazop-api'
// export const Endpoint = {
//     SINGAPORE: 'https://api.lazada.sg/rest',
//     THAILAND: 'https://api.lazada.co.th/rest',
//     MALAYSIA: 'https://api.lazada.com.my/rest',
//     VIETNAM: 'https://api.lazada.vn/rest',
//     PHILIPPINES: 'https://api.lazada.com.ph/rest',
//     INDONESIA: 'https://api.lazada.co.id/rest',
//     AUTH: 'https://auth.lazada.com/rest'
//   }

class LazopClient {
  constructor(url, appKey, appSecret) {}
}

export class LazopConnector implements Connector {
  async ready(connectionConfigs) {
    await Promise.all(connectionConfigs.map(this.connect))

    Connections.logger.info('lazop-connector connections are ready')
  }

  async connect(connection) {
    var { endpoint: url, params: { appKey, appSecret } = { appKey: '', appSecret: '' } } = connection

    const client = new LazopClient(url, appKey, appSecret)

    Connections.addConnection(connection.name, client)

    Connections.logger.info(`lazop-connector connection(${connection.name}:${connection.endpoint}) is connected`)
  }

  async disconnect(name) {
    Connections.removeConnection(name)

    Connections.logger.info(`lazop-connector connection(${name}) is disconnected`)
  }

  get parameterSpec() {
    return [
      {
        type: 'string',
        label: 'app-key',
        name: 'appKey'
      },
      {
        type: 'string',
        label: 'app-secret',
        name: 'appSecret'
      }
    ]
  }

  get taskPrefixes() {
    return ['lazop']
  }
}

Connections.registerConnector('lazop-connector', new LazopConnector())
