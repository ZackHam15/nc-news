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
        expect(typeof res.body).toBe("object");
      });
  });
  test("200: returns topics as correct format", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        res.body.results.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: returns an error if there's an error", () => {
    return request(app).get("/api/topic").expect(404);
  });
});

describe("GET /api/articles:article_id", () => {
  test("200: responds with an object of properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
      });
  });
  test("200: returns articles as correct format", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        res.body.data.forEach((article) => {
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
      });
  });
  test("200: returns articles as correct format", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {
        res.body.data.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 2,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.anything(),
            votes: expect.any(Number),
          });
        });
      });
  });
  test("404: returns an error if there's an error", () => {
    return request(app).get("/api/article/1").expect(404);
  });
});

describe("GET /api/users", () => {
  test("200: responds with an array of object of users' username", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(typeof res.body).toBe("object");
      });
  });
  test("200: returns only usernames from the users' table", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        res.body.data.forEach((allUsers) => {
          expect(allUsers).toMatchObject({
            username: expect.any(String),
          });
        });
      });
  });
  test("404: returns an error if there's an error", () => {
    return request(app).get("/api/user").expect(404);
  });
});
