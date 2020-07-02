import gql from 'graphql-tag'

export const BizplacePlatform = gql`
  type BizplacePlatform {
    id: String
    name: String
    domain: Domain
    description: String
    updater: User
    creator: User
    updatedAt: String
    createdAt: String
  }
`
