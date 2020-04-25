import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'mms-catalogue',
      page: 'mms-catalogue'
    },
    {
      tagname: 'mms-dashboard',
      page: 'mms-dashboard'
    },
    {
      tagname: 'mms-integration',
      page: 'mms-integration'
    },
    {
      tagname: 'mms-integration-channels',
      page: 'mms-integration-channels'
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
      tagname: 'mms-order',
      page: 'mms-order'
    },
    {
      tagname: 'mms-promotions',
      page: 'mms-promotions'
    },
    {
      tagname: 'mms-reports',
      page: 'mms-reports'
    }
  ],
  bootstrap
}
