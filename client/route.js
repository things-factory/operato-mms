export default function route(page) {
  switch (page) {
    case '':
      return '/seller-dashboard'

    case 'seller-catalogue':
      import('./pages/catalogue/catalogue')
      return page

    case 'seller-dashboard':
      import('./pages/dashboard/dashboard')
      return page

    case 'seller-integration':
      import('./pages/integration/integration')
      return page

    case 'seller-inventory':
      import('./pages/inventory/inventory')
      return page

    case 'seller-order':
      import('./pages/order/order')
      return page

    case 'seller-promotions':
      import('./pages/promotions/promotions')
      return page

    case 'seller-reports':
      import('./pages/reports/reports')
      return page
  }
}
