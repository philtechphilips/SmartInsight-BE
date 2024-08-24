import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Autobot",
  tableName: "autobots",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    username: {
      type: "varchar",
      unique: true,
    }
  },
  relations: {
    posts: {
      target: "Post",
      type: "one-to-many",
      inverseSide: "autobot",
    },
  },
});
