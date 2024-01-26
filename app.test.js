const request = require('supertest');
const app = require('./app'); 

describe("GET /items", () => {
    test("It should respond with an array of items", async () => {
      const response = await request(app).get("/items");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
});
  
describe("POST /items", () => {
    test("It should add a new item", async () => {
      const newItem = { name: "Test Item", price: "1.00" };
      const response = await request(app).post("/items").send(newItem);
      expect(response.statusCode).toBe(200);
      expect(response.body.added).toEqual(newItem);
    });
});
  
describe("PATCH /items/:name", () => {
    test("It should update the item", async () => {
      const updatedItem = { name: "Updated Test Item", price: "1.50" };
      const response = await request(app).patch("/items/Test Item").send(updatedItem);
      expect(response.statusCode).toBe(200);
      expect(response.body.updated).toEqual(updatedItem);
    });
});

describe("DELETE /items/:name", () => {
    test("It should delete the item", async () => {
      // First, add the item
      const newItem = { name: "Test Item", price: "1.00" };
      await request(app).post("/items").send(newItem);

      // Then, delete the item
      const response = await request(app).delete("/items/Test Item");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'Deleted' });
    });
});

  
  