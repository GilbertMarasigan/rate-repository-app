import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    id
                    fullName
                    ownerAvatarUrl
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                }
            }
        }
    }
`;

export const AUTHENTICATE = gql`
mutation Authenticate($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`;

export const USER_LOGGED_IN = gql`
query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            user {
              username
            }
            createdAt
            text
            repository {
              fullName
              id
            }
          }
        }
      }
    }
}
`;

export const SINGLE_REPO = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id,
    fullName,
    url,
    ownerAvatarUrl,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}`

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    createdAt
    id
    rating
    repositoryId
    text
  }
}`

export const CREATE_USER = gql`
mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
  }
}
`

export const DELETE_REVIEW = gql`
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`