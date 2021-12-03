import assert from "assert";
import { HttpClient, TsrpcError } from "tsrpc";
import { serviceProto } from "../../src/shared/protocols/serviceProto";


describe("AddProduct", function () {
  let client = new HttpClient(serviceProto, {
    server: "http://127.0.0.1:3000",
    logger: console,
  });

  it("AddProduct", async function () {
    await client.callApi("AddProduct", { 
      title: "你好啊",
      desc: "王薇薇",
      price: 10000,
      pushUserId: 1
     });
  });
});
