import gql from 'graphql-tag'

export const BizplacePlatformPatch = gql`
  input BizplacePlatformPatch {
    id: String
    name: String
    description: String
    cuFlag: String
  }
`
