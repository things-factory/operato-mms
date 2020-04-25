export default function route(page) {
  switch (page) {
    case '':
      return '/mms-dashboard'

    case 'mms-catalogue':
      import('./pages/catalogue/catalogue')
      return page

    case 'mms-dashboard':
      import('./pages/dashboard/dashboard')
      return page

    case 'mms-integration':
      import('./pages/integration/integration')
      return page

    case 'mms-integration-channels':
      import('./pages/integration/channels')
      return page

    case 'mms-integration-offline-stores':
      import('./pages/integration/offline-stores')
      return page

    case 'mms-integration-wareo':
      import('./pages/integration/wareo')
      return page

    case 'mms-integration-shipping-carriers':
      import('./pages/integration/shipping-carriers')
      return page

    case 'mms-integration-accounting':
      import('./pages/integration/accounting')
      return page

    case 'mms-integration-activities':
      import('./pages/integration/activities')
      return page

    case 'mms-inventory':
      import('./pages/inventory/inventory')
      return page

    case 'mms-order':
      import('./pages/order/order')
      return page

    case 'mms-promotions':
      import('./pages/promotions/promotions')
      return page

    case 'mms-reports':
      import('./pages/reports/reports')
      return page
  }
}
