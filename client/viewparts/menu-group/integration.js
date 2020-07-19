import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'ecommerce channels',
    path: 'marketplace-stores',
    icon: 'storage'
  },
  {
    name: 'offline stores',
    path: 'mms-integration-offline-stores',
    icon: 'store'
  },
  {
    name: 'wareo integration',
    path: 'mms-integration-wareo',
    icon: 'shop'
  },
  {
    name: 'shipping carriers',
    path: 'mms-integration-shipping-carriers',
    icon: 'shopping_basket'
  },
  {
    name: 'accounting tools',
    path: 'mms-integration-accounting',
    icon: 'account_box'
  },
  {
    name: 'bulk activities',
    path: 'mms-integration-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupIntegration extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-integration', MenuGroupIntegration)
