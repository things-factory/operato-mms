import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'products',
    path: 'mms-inventory-products',
    icon: 'storage'
  },
  {
    name: 'bulk activities',
    path: 'mms-inventory-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupInventory extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-inventory', MenuGroupInventory)
