const express = require("express");
const {
  getTopics,
  getArticleId,
  patchArticleId,
  getUsers,
  getArticleComment,
} = require("./controllers/app.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleId, getArticleComment);

// app.patch("/api/articles/:article_id", patchArticleId);

app.get("/api/users", getUsers);

module.exports = app;
