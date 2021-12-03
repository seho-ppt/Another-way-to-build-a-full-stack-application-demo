import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("products_pkey", ["id"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @Column("text", { name: "title", nullable: true })
  title: string | null | undefined;

  @Column("text", { name: "desc", nullable: true })
  desc: string | null | undefined;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number | undefined;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date | undefined;

  @Column("timestamp with time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date | undefined;

  @Column("integer", { name: "push_user_id", nullable: true })
  pushUserId: number | null | undefined;

  @Column("integer", { name: "price", nullable: true })
  price: number | null | undefined;
}
