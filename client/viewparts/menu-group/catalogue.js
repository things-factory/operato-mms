import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'products',
    path: 'mms-catalogue-products',
    icon: 'storage'
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
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-catalogue', MenuGroupCatalogue)
