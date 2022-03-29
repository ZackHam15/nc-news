const db = require("../db/connection");

exports.selectTopics = () => {
  return db
    .query("SELECT slug, description FROM topics;")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.selectArticleId = (article_id) => {
  return db
    .query(
      "SELECT author, title, article_id, body, topic, created_at, votes FROM articles WHERE article_id = $1;",
      [article_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(er);
    });
};

exports.selectArticleComment = (article_id) => {
  return db
    .query("SELECT comment_count FROM", [article_id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(er);
    });
};

// exports.updateArticleId = (article_id, inc_votes) => {
//   return db
//     .query(
//       "UPDATE articles SET inc_votes = $1 WHERE article_id = $2 RETURNING *;",
//       [inc_votes, article_id]
//     )
//     .then((result) => {
//       return result.rows[0];
//     });
// };

exports.selectUsers = () => {
  return db
    .query("SELECT username FROM users")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
