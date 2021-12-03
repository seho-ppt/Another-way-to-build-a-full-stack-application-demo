
export interface ReqAddProduct {
  /** 产品标题 */
  title: string;
  /** 产品介绍 */
  desc: string;
  /** 产品价格 */
  price: number;
  /** 推送产品的用户 */
  pushUserId: number;
}

export interface ResAddProduct {
  /** 服务端内容创建时间 */
  id?: number
}
