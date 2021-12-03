import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query getProducts(
    $limit: Int = 10
    $offset: Int
    $title: String
    $desc: String
    $minPrice: Int
  ) {
    products(
      where: {
        title: { _like: $title }
        desc: { _like: $desc }
        price: { _gte: $minPrice }
      }
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
    ) {
      id
      title
      desc
      price
      push_user {
        id
        phone
      }
    }
    products_aggregate(
      where: {
        title: { _like: $title }
        desc: { _like: $desc }
        price: { _gte: $minPrice }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct($params: AddProductInput!) {
    addProduct(params: $params) {
      id
    }
  }
`;
