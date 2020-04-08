import route from './client/route'
import bootstrap from './client/bootstrap'

export default {
  route,
  routes: [
    {
      tagname: 'seller-catalogue',
      page: 'seller-catalogue',
    },
    {
      tagname: 'seller-dashboard',
      page: 'seller-dashboard',
    },
    {
      tagname: 'seller-integration',
      page: 'seller-integration',
    },
    {
      tagname: 'seller-inventory',
      page: 'seller-inventory',
    },
    {
      tagname: 'seller-order',
      page: 'seller-order',
    },
    {
      tagname: 'seller-promotions',
      page: 'seller-promotions',
    },
    {
      tagname: 'seller-reports',
      page: 'seller-reports',
    },
  ],
  bootstrap,
}
