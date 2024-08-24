import express from "express";
import { fetchAuthorPost, fetchAutoBots, fetchPostComment } from "../controllers/AutoBot";

const Router = express.Router();

Router.get('/', fetchAutoBots);

Router.get('/:id/posts', fetchAuthorPost);

Router.get('/posts/:id/comments', fetchPostComment);


module.exports = Router;