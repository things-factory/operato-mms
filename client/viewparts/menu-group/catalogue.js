import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'products',
    path: 'mms-catalogue-products',
    icon: 'border_all'
  },
  {
    name: 'bulk activities',
    path: 'mms-catalogue-activities',
    icon: 'local_activity'
  },
  {
    name: 'cross list',
    path: 'mms-catalogue-cross-list',
    icon: 'local_activity'
  }
]

export class MenuGroupCatalogue extends MenuGroupAbstract {
  getStores() {
    return [
      {
        name: 'Lazada Malaysia',
        path: 'mms-catalogue-products/lazada-malaysia',
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

customElements.define('menu-group-catalogue', MenuGroupCatalogue)
