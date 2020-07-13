import { Connections, ScenarioEngine } from '@things-factory/integration-base'

export * from './entities'
export * from './graphql'

import './middlewares'
import './routes'
import './engine'

process.on('bootstrap-module-start' as any, async ({ app, config, client }: any) => {
  console.log('%%%%%%%%%%%%%%%% TASK ENGINE - BEGIN %%%%%%%%%%%%%%%%')
  try {
    await Connections.ready()
    await ScenarioEngine.loadAll()
  } catch (ex) {
    Connections.logger.error(ex)
  }
  console.log('%%%%%%%%%%%%%%%% TASK ENGINE - END %%%%%%%%%%%%%%%%')
})
