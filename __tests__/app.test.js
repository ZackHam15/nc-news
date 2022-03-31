const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");
const res = require("express/lib/response");

afterAll(() => {
  if (db.end) db.end();
});
beforeEach(() => seed(testData));

describe("GET /api/topics", () => {
  test("200: responds with an array of objects of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        res.body.topic.forEach((Topics) => {
          expect(Topics).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
          expect(Array.isArray([res.body.topic])).toBe(true);
        });
      });
  });
});

describe("GET /api/articles:article_id", () => {
  test("200: responds with an object of properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.anything(),
            votes: expect.any(Number),
          });
        });
        expect(Array.isArray([res.body.articles])).toBe(true);
      });
  });
  test("200: returns articles as correct format", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 2,
            body: expect.any(String), // this is testing for different id numbers and seeing if they still match with data
            topic: expect.any(String),
            created_at: expect.anything(),
            votes: expect.any(Number),
          });
        });
      });
  });
  test("404: returns an error if not found in database", () => {
    return request(app).get("/api/article/999").expect(404);
  });
});

describe("GET /api/users", () => {
  test("200: responds with an array of object of users' username", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray([res.body.users])).toBe(true);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
          });
        });
      });
  });
});
