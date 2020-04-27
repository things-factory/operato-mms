import { MenuGroupAbstract } from './menu-group-abstract'

const MENUS = [
  {
    name: 'total sales',
    path: 'mms-report-total-sales',
    icon: 'storage'
  },
  {
    name: 'total orders',
    path: 'mms-report-total-orders',
    icon: 'store'
  },
  {
    name: 'daily sales average',
    path: 'mms-report-daily-sales-average',
    icon: 'shop'
  },
  {
    name: 'total sales by store',
    path: 'mms-report-sales-by-store',
    icon: 'shopping_basket'
  },
  {
    name: 'sales by promotion',
    path: 'mms-report-sales-by-promotion',
    icon: 'account_box'
  },
  {
    name: 'current inventory stock value',
    path: 'mms-report-inventory',
    icon: 'local_activity'
  },
  {
    name: 'top selling products',
    path: 'mms-report-top-selling',
    icon: 'local_activity'
  },
  {
    name: 'generated reports',
    path: 'mms-report-custom',
    icon: 'local_activity'
  }
]

export class MenuGroupReports extends MenuGroupAbstract {
  getMenus() {
    return MENUS
  }
}

customElements.define('menu-group-reports', MenuGroupReports)
