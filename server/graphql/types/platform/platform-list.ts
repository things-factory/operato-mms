import gql from 'graphql-tag'

export const PlatformList = gql`
  type PlatformList {
    items: [Platform]
    total: Int
  }
`
