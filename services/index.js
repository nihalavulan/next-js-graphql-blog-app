import {request , gql} from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              slug
              title
              createdAt
              excert
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }      
    `

    const result = await request(graphqlAPI , query)
    return result.postsConnection.edges
}

export const getRecentPost = async () => {
    const query = gql`
        query getPostDetails () {
            posts(
                orderBy : createdAt_ASC
                last : 3
                ){
                    title
                    featuredImage{
                        url
                    }
                    createdAt
                    slug
                }
        }
    `

    const result = await request(graphqlAPI , query)
    return result.posts
}


export const getSimilarPosts = async () => {
    const query = gql`
    query getPostDetails ($slug:String!,$categories : [String!]) {
        posts(
            where : { slug_not : $slug , AND : {categories_some : {slug_in : $categories}} }
            last : 3
        ){
                    title
                    featuredImage{
                        url
                    }
                    createdAt
                    slug
                }
    }
`

    const result = await request(graphqlAPI , query)
    return result.posts
}