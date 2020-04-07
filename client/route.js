export default function route(page) {
  switch (page) {
    case '':
      return '/operato-seller-main'

    case 'operato-seller-main':
      import('./pages/main')
      return page
  }
}
