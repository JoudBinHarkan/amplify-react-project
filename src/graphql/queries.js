/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents {
    listEvents {
      items {
        eventId
        eventTitle
        description
        startTime
        endTime
      }
    }
  }
`;

export const sendMessage = /* GraphQL */ `
  mutation SendMessage($query: String!, $session_id: String!) {
    sendMessage(query: $query, session_id: $session_id) {
      response
    }
  }
`;