export default function route(page) {
  switch (page) {
    case '':
      return '/mms-dashboard'

    case 'mms-catalogue-products':
      import('./pages/catalogue/products')
      return page

    case 'mms-catalogue-activities':
      import('./pages/catalogue/activities')
      return page

    case 'mms-catalogue-cross-list':
      import('./pages/catalogue/cross-list')
      return page

    case 'mms-dashboard':
      import('./pages/dashboard/dashboard')
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

    case 'mms-inventory-products':
      import('./pages/inventory/products')
      return page

    case 'mms-inventory-activities':
      import('./pages/inventory/activities')
      return page

    case 'mms-order-stores':
      import('./pages/order/stores')
      return page

    case 'mms-order-activities':
      import('./pages/order/activities')
      return page

    case 'mms-promotion-promotions':
      import('./pages/promotions/promotions')
      return page

    case 'mms-promotion-activities':
      import('./pages/promotions/activities')
      return page

    case 'mms-report-total-sales':
      import('./pages/reports/total-sales')
      return page

    case 'mms-report-total-orders':
      import('./pages/reports/total-orders')
      return page

    case 'mms-report-daily-sales-average':
      import('./pages/reports/daily-sales-average')
      return page

    case 'mms-report-sales-by-store':
      import('./pages/reports/sales-by-store')
      return page

    case 'mms-report-sales-by-promotion':
      import('./pages/reports/sales-by-promotion')
      return page

    case 'mms-report-inventory':
      import('./pages/reports/inventory')
      return page

    case 'mms-report-top-selling':
      import('./pages/reports/top-selling')
      return page

    case 'mms-report-custom':
      import('./pages/reports/custom')
      return page
  }
}
