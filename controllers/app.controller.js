const {
  selectTopics,
  selectArticleById,
  updateArticleId,
  selectUsers,
  selectArticleComments,
} = require("../models/app.model");

exports.getTopics = (req, res) => {
  selectTopics().then((results) => {
    res.status(200).send({ topic: results });
  });
};

exports.getArticleId = (req, res) => {
  const { article_id } = req.params;
  selectArticleById(article_id).then((data) => {
    res.status(200).send({ articles: data });
  });
};

exports.getArticleComments = (req, res) => {
  const { article_id } = req.params;
  selectArticleComments(article_id).then((data) => {
    res.status(200).send({ articles: data });
  });
};

// exports.patchArticleId = (req, res) => {
//   const { article_id } = req.params;
//   const { inc_votes } = req.body.inc_votes;
//   if (inc_votes === undefined) {
//     res.status(400).send("Given an empty object!");
//   } else {
//     updateArticleId(inc_votes, article_id).then((article) => {
//       res.status(200).send({ article: article });
//     });
//   }
// };

exports.getUsers = (req, res) => {
  selectUsers().then((data) => {
    res.status(200).send({ users: data });
  });
};
