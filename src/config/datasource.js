import { DataSource } from 'typeorm';
import Autobot from '../entity/Autobot';
import Post from '../entity/Post';
import Comment  from '../entity/Comment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'smart-insight',
  synchronize: true,
  logging: false,
  entities: [Autobot, Post, Comment],
  migrations: [],
  subscribers: [],
});
