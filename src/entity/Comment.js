import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    body: {
      type: "text",
    },
  },
  relations: {
    post: {
      target: "Post",
      type: "many-to-one",
      inverseSide: "comments",
      onDelete: "CASCADE",
    },
  },
});
