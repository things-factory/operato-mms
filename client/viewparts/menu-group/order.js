import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'stores',
    path: 'mms-order-by-store',
    icon: 'store'
  },
  {
    name: 'bulk activities',
    path: 'mms-order-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupOrder extends MenuGroupAbstract {
  getStores() {
    return [
      {
        name: 'Lazada Malaysia',
        path: 'mms-order-by-store/lazada-malaysia',
        icon: 'store'
      }
    ]
  }

  getMenus() {
    var menus = [...MENUS]

    menus[0].menus = this.getStores()
    return menus
  }
}

customElements.define('menu-group-order', MenuGroupOrder)
