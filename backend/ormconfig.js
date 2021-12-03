module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "postgres",
  entities: ["./src/entities/*.ts"],
};
