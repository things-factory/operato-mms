import gql from 'graphql-tag'

export const PlatformPatch = gql`
  input PlatformPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
