import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    title: {
      type: 'varchar',
      unique: true,
    },
  },
  relations: {
    autobot: {
      target: 'Autobot',
      type: 'many-to-one',
      joinColumn: true,
    },
    comments: {
      target: 'Comment',
      type: 'one-to-many',
      inverseSide: 'post',
    },
  },
});
