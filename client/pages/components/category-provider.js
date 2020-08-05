import { sleep } from '@things-factory/utils'

const categories = [
  { id: 'a', name: 'a', path: 'a' },
  {
    id: 'b',
    name: 'b',
    path: 'b',
    children: [
      { id: 'ba', name: 'ba', path: 'ba' },
      { id: 'bb', name: 'bb', path: 'bb' },
      { id: 'bc', name: 'bc', path: 'bc' },
      {
        id: 'bd',
        name: 'bd',
        path: 'bd',
        children: [
          { id: 'bda', name: 'bda', path: 'bda' },
          { id: 'bdb', name: 'bdb', path: 'bdb' },
          { id: 'bdc', name: 'bdc', path: 'bdc' },
          {
            id: 'bdd',
            name: 'bdd',
            path: 'bdd',
            children: [
              { id: 'bdda', name: 'bdda', path: 'bdda' },
              { id: 'bddb', name: 'bddb', path: 'bddb' },
              { id: 'bddc', name: 'bddc', path: 'bddc' },
              {
                id: 'bddd',
                name: 'bddd',
                path: 'bddd',
                children: [
                  { id: 'bddda', name: 'bddda', path: 'bddda' },
                  { id: 'bdddb', name: 'bdddb', path: 'bdddb' },
                  { id: 'bdddc', name: 'bdddc', path: 'bdddc' },
                  { id: 'bdddd', name: 'bdddd', path: 'bdddd' }
                ]
              }
            ]
          }
        ]
      },
      { id: 'be', name: 'be', path: 'be' },
      { id: 'bf', name: 'bf', path: 'bf' }
    ]
  },
  { id: 'c', name: 'c', path: 'c' },
  {
    id: 'd',
    name: 'd',
    path: 'd',
    children: [
      { id: 'da', name: 'da', path: 'da' },
      { id: 'db', name: 'db', path: 'db' },
      { id: 'dc', name: 'dc', path: 'dc' },
      {
        id: 'dd',
        name: 'dd',
        path: 'dd',
        children: [
          { id: 'dda', name: 'dda', path: 'dda' },
          { id: 'ddb', name: 'ddb', path: 'ddb' },
          { id: 'ddc', name: 'ddc', path: 'ddc' },
          {
            id: 'ddd',
            name: 'ddd',
            path: 'ddd',
            children: [
              { id: 'ddda', name: 'ddda', path: 'ddda' },
              { id: 'dddb', name: 'dddb', path: 'dddb' },
              { id: 'dddc', name: 'dddc', path: 'dddc' },
              {
                id: 'dddd',
                name: 'dddd',
                path: 'dddd',
                children: [
                  { id: 'dddda', name: 'dddda', path: 'dddda' },
                  { id: 'ddddb', name: 'ddddb', path: 'ddddb' },
                  { id: 'ddddc', name: 'ddddc', path: 'ddddc' },
                  { id: 'ddddd', name: 'ddddd', path: 'ddddd' }
                ]
              },
              { id: 'ddde', name: 'ddde', path: 'ddde' }
            ]
          },
          { id: 'dde', name: 'dde', path: 'dde' }
        ]
      },
      { id: 'de', name: 'de', path: 'de' }
    ]
  },
  { id: 'e', name: 'e', path: 'e' },
  { id: 'f', name: 'f', path: 'f' }
]

function findCategory(target, categories) {
  var found = categories.find(category => category.id == target.id)

  if (!found) {
    for (const category of categories.filter(category => category.children)) {
      found = findCategory(target, category.children)
      if (found) {
        break
      }
    }
  }

  return found
}

export async function getCategories(parent) {
  if (parent) {
    parent = findCategory(parent, categories)
  }

  const children = (parent ? parent.children : categories) || []

  // emulating asynchronous server response
  await sleep(Math.floor(1500 * Math.random()))

  return children.map(category => {
    const { id, name, path } = category
    return { id, name, path, hasSubcategories: !!category.children }
  })
}
