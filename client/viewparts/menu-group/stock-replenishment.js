import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'stock replenishment list',
    path: 'mms-stock-replenishment-list',
    icon: 'list'
  },
  {
    name: 'create stock replenishment',
    path: 'mms-create-stock-replenishment',
    icon: 'stock'
  },
  {
    name: 'bulk activities',
    path: 'mms-stock-replenishment-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupStockReplenishment extends MenuGroupAbstract {
  getMenus() {
    return menus
  }
}

customElements.define('menu-group-stock-replenishment', MenuGroupStockReplenishment)
