import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'promotions',
    path: 'mms-promotion-promotions',
    icon: 'storage',
    menus: [
      {
        name: 'discount',
        path: 'mms-promotion-promotions/discount',
        icon: 'storage'
      },
      {
        name: 'gift-with-purchase',
        path: 'mms-promotion-promotions/gift-with-purchase',
        icon: 'storage'
      },
      {
        name: 'gift-with-pre-booking',
        path: 'mms-promotion-promotions/pre-booking',
        icon: 'storage'
      },
      {
        name: 'gift-with-flash-sale',
        path: 'mms-promotion-promotions/flash-sale',
        icon: 'storage'
      }
    ]
  },
  {
    name: 'bulk activities',
    path: 'mms-promotion-activities',
    icon: 'local_activity'
  }
]

export class MenuGroupPromotions extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-promotions', MenuGroupPromotions)
