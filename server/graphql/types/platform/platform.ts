import gql from 'graphql-tag'

export const Platform = gql`
  type Platform {
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
