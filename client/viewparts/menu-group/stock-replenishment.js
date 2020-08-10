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
    icon: 'add'
  }
]

export class MenuGroupStockReplenishment extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-stock-replenishment', MenuGroupStockReplenishment)
