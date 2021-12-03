import * as path from "path";
import "reflect-metadata";
import { HttpServer } from "tsrpc";
import { serviceProto } from "./shared/protocols/serviceProto";
import { createConnection } from "typeorm";

// Create the Server
const server = new HttpServer(serviceProto, {
  port: 3000,
  // Remove this to use binary mode (remove from the client too)
  json: true,
});

// Initialize before server start
async function init() {
  // Auto implement APIs
  await server.autoImplementApi(path.resolve(__dirname, "api"));
  await createConnection();
}

// Entry function
async function main() {
  await init();
  await server.start();
  server.flows.preRecvDataFlow.push((call) => {
    const {
      httpReq: { rawHeaders },
    } = call.conn as any;
    // hasura环境
    if (
      rawHeaders.filter((r: string) => r.includes("hasura-graphql-engine"))
        .length > 0
    ) {
      // 判断headers是否有hasura自定义标识
      const _data = JSON.parse(call.data as any);
      console.log(_data.input.params)
      return {
        ...call,
        data: _data.input.params,
      };
    } else {
      return call;
    }
  });
  server.flows.preSendDataFlow.push((v) => {
    if (typeof v.data === "string") {
      let ret = JSON.parse(v.data);
      if (ret.isSucc) {
        v.data = JSON.stringify(ret.res);
      } else {
        v.data = JSON.stringify({
          message: ret.err,
        });
      }
    }
    return v
  });
}
main();
