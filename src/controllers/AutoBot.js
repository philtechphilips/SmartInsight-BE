import axios from "axios";
import { AppDataSource } from "../config/datasource";
import Autobot from "../entity/Autobot";
import Post from "../entity/Post";
import Comment from "../entity/Comment";
import { errorResponse, successResponse } from "../utils/responsehandler";

export const createAutobots = async () => {
  try {
    const autobotRepo = AppDataSource.getRepository(Autobot);
    const postRepo = AppDataSource.getRepository(Post);
    const commentRepo = AppDataSource.getRepository(Comment);

    const usedPostTitles = new Set();

    // Fetch and cache all necessary data at once
    const userResponses = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = userResponses.data.slice(0, 500);

    for (const userData of users) {
      const uniqueUsername = `${userData.username}_${Date.now()}`;

      const autobot = autobotRepo.create({
        name: userData.name,
        username: uniqueUsername,
      });
      await autobotRepo.save(autobot);

      const postPromises = [];
      const commentPromises = [];

      for (let j = 0; j < 10; j++) {
        let postData;
        let uniqueTitle;
        do {
          postData = (
            await axios.get(
              `https://jsonplaceholder.typicode.com/posts/${
                Math.floor(Math.random() * 100) + 1
              }`
            )
          ).data;
          uniqueTitle = `${postData.title} - Autobot ${Date.now()}`;
        } while (usedPostTitles.has(uniqueTitle));
        usedPostTitles.add(uniqueTitle);

        const post = postRepo.create({
          title: uniqueTitle,
          body: postData.body,
          autobot,
        });
        postPromises.push(postRepo.save(post));

        for (let k = 0; k < 10; k++) {
          const commentData = (
            await axios.get(
              `https://jsonplaceholder.typicode.com/comments/${
                Math.floor(Math.random() * 500) + 1
              }`
            )
          ).data;
          const comment = commentRepo.create({
            name: commentData.name,
            body: commentData.body,
            post,
          });
          commentPromises.push(commentRepo.save(comment));
        }
      }

      // Wait for all posts and comments to be saved
      await Promise.all(postPromises);
      await Promise.all(commentPromises);
    }
  } catch (error) {
    console.error(
      "An error occurred during the Autobot creation process:",
      error
    );
  }
};

export const fetchAutoBots = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const autobots = await AppDataSource.getRepository(Autobot).find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return successResponse(req, res, {
      statusCode: 200,
      status: "success",
      message: "Users fetched.",
      payload: autobots,
      token: null,
    });
  } catch (error) {
    console.error("Error fetching autobots:", error);
    return errorResponse(req, res, {
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error.",
      payload: null,
    });
  }
};

export const fetchAuthorPost = async (req, res) => {
  const autobotId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const posts = await AppDataSource.getRepository(Post).find({
      where: { autobot: { id: autobotId } },
      skip: (page - 1) * limit,
      take: limit,
    });
    return successResponse(req, res, {
      statusCode: 200,
      status: "success",
      message: "Fetched author post.",
      payload: posts,
      token: null,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return errorResponse(req, res, {
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error.",
      payload: null,
    });
  }
};

export const fetchPostComment = async (req, res) => {
  const postId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const postExists = await AppDataSource.getRepository(Post).findOneBy({ id: postId });
    if (!postExists) {
      return errorResponse(req, res, {
        statusCode: 404,
        status: "failure",
        message: "Post not found.",
        payload: null,
      });
    }

    const comments = await AppDataSource.getRepository(Comment).find({
      where: { post: { id: postId } },
      skip: (page - 1) * limit,
      take: limit,
    });

    return successResponse(req, res, {
      statusCode: 200,
      status: "success",
      message: "Fetched comments successfully.",
      payload: comments,
      token: null,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return errorResponse(req, res, {
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error.",
      payload: null,
    });
  }
};
