import { ApiCall } from "tsrpc";
import {
  ReqAddProduct,
  ResAddProduct,
} from "../shared/protocols/PtlAddProduct";
import { getRepository } from "typeorm";
import { Products } from "../entities/Products";

export async function ApiAddProduct(
  call: ApiCall<ReqAddProduct, ResAddProduct>
) {
  const res = await getRepository(Products).save(call.req);
  call.succ({
    id: res.id
  })
}
