const {
  selectTopics,
  selectArticleId,
  updateArticleId,
  selectUsers,
  selectArticleComment,
} = require("../models/app.model");

exports.getTopics = (req, res) => {
  selectTopics().then((results) => {
    res.status(200).send({ results });
  });
};

exports.getArticleId = (req, res) => {
  const { article_id } = req.params;
  selectArticleId(article_id).then((data) => {
    res.status(200).send({ data });
  });
};

exports.getArticleComment = (req, res) => {
  const { article_id } = req.params;
  selectArticleComment(article_id).then((data) => {
    res.status(200).send({ data });
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
    res.status(200).send({ data });
  });
};
