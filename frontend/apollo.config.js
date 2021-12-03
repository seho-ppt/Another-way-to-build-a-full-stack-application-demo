module.exports = {
  client: {
    service: {
      name: "hasura-test",
      // GraphQL API 的 URL
      url: "http://localhost:8080/v1/graphql",
    },
    includes: ["src/**/*.vue", "src/graphql/*.ts"],
  },
};
