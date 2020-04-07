import { store } from '@things-factory/shell'
import operatoSeller from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    operatoSeller
  })
}
