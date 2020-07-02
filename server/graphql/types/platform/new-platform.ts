import gql from 'graphql-tag'

export const NewPlatform = gql`
  input NewPlatform {
    name: String!
    description: String
  }
`
