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
