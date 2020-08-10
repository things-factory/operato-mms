import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'replenishment list',
    path: 'mms-stock-replenishment-list',
    icon: 'list'
  },
  {
    name: 'create order',
    path: 'mms-stock-replenishment-create',
    icon: 'add'
  }
]

export class MenuGroupStockReplenishment extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-stock-replenishment', MenuGroupStockReplenishment)
