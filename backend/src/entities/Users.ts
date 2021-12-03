import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number | undefined;

  @Column("text", { name: "nickname", nullable: true })
  nickname: string | null | undefined;

  @Column("text", { name: "phone" })
  phone: string | undefined;
}
