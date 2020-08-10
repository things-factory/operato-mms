import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'mms-catalogue-products',
      page: 'mms-catalogue-products'
    },
    {
      tagname: 'mms-catalogue-activities',
      page: 'mms-catalogue-activities'
    },
    {
      tagname: 'mms-catalogue-cross-list',
      page: 'mms-catalogue-cross-list'
    },
    {
      tagname: 'mms-dashboard',
      page: 'mms-dashboard'
    },
    {
      tagname: 'mms-integration-offline-stores',
      page: 'mms-integration-offline-stores'
    },
    {
      tagname: 'mms-integration-wareo',
      page: 'mms-integration-wareo'
    },
    {
      tagname: 'mms-integration-shipping-carriers',
      page: 'mms-integration-shipping-carriers'
    },
    {
      tagname: 'mms-integration-accounting',
      page: 'mms-integration-accounting'
    },
    {
      tagname: 'mms-integration-activities',
      page: 'mms-integration-activities'
    },
    {
      tagname: 'mms-inventory',
      page: 'mms-inventory'
    },
    {
      tagname: 'mms-inventory-activities',
      page: 'mms-inventory-activities'
    },
    {
      tagname: 'mms-order-by-store',
      page: 'mms-order-by-store'
    },
    {
      tagname: 'mms-order-activities',
      page: 'mms-order-activities'
    },
    {
      tagname: 'mms-create-stock-replenishment',
      page: 'mms-create-stock-replenishment'
    },
    {
      tagname: 'mms-stock-replenishment-list',
      page: 'mms-stock-replenishment-list'
    },
    {
      tagname: 'mms-promotion-promotions',
      page: 'mms-promotion-promotions'
    },
    {
      tagname: 'mms-promotion-activities',
      page: 'mms-promotion-activities'
    },
    {
      tagname: 'mms-report-total-sales',
      page: 'mms-report-total-sales'
    },
    {
      tagname: 'mms-report-total-orders',
      page: 'mms-report-total-orders'
    },
    {
      tagname: 'mms-report-daily-sales-average',
      page: 'mms-report-daily-sales-average'
    },
    {
      tagname: 'mms-report-sales-by-store',
      page: 'mms-report-sales-by-store'
    },
    {
      tagname: 'mms-report-sales-by-promotion',
      page: 'mms-report-sales-by-promotion'
    },
    {
      tagname: 'mms-report-inventory',
      page: 'mms-report-inventory'
    },
    {
      tagname: 'mms-report-top-selling',
      page: 'mms-report-top-selling'
    },
    {
      tagname: 'mms-report-custom',
      page: 'mms-report-custom'
    }
  ],
  bootstrap
}
