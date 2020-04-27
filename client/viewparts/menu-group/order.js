import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'stores',
    path: 'mms-order-stores',
    icon: 'storage'
  },
  {
    name: 'bulk activities',
    path: 'mms-order-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupOrder extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-order', MenuGroupOrder)
