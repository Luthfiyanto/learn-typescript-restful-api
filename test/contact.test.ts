import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new contact", async () => {
    const response = await supertest(web).post("/api/contacts").set("X-API-TOKEN", "test").send({
      first_name: "Lulu",
      last_name: "Farida",
      email: "lulufarida@example.com",
      phone: "0899999999",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data.first_name).toBe("Lulu");
    expect(response.body.data.last_name).toBe("Farida");
    expect(response.body.data.email).toBe("lulufarida@example.com");
    expect(response.body.data.phone).toBe("0899999999");
  });

  it("should reject create new contact if data is invalid", async () => {
    const response = await supertest(web).post("/api/contacts").set("X-API-TOKEN", "test").send({
      first_name: "",
      last_name: "",
      email: "lulufarida",
      phone: "089999999999999999999999999999999999999",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });
});

describe("GET /api/contacts/contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).get(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });

  it("should reject to get contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should to be able to update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "Lulu",
      last_name: "Alfani",
      email: "lulufarida@example.com",
      phone: "0876999999",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data.first_name).toBe("Lulu");
    expect(response.body.data.last_name).toBe("Alfani");
    expect(response.body.data.email).toBe("lulufarida@example.com");
    expect(response.body.data.phone).toBe("0876999999");
  });

  it("should reject update contact if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).put(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test").send({
      first_name: "",
      last_name: "",
      email: "",
      phone: "0876999999",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to remove contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).delete(`/api/contacts/${contact.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject to remove contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search contact", async () => {
    const response = await supertest(web).get("/api/contacts").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact using name", async () => {
    const response = await supertest(web).get("/api/contacts").query({ name: "es" }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact using email", async () => {
    const response = await supertest(web).get("/api/contacts").query({ email: "example" }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact using email", async () => {
    const response = await supertest(web).get("/api/contacts").query({ phone: "99" }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact no result", async () => {
    const response = await supertest(web).get("/api/contacts").query({ name: "salah" }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search contact with paging", async () => {
    const response = await supertest(web).get("/api/contacts").query({ page: 2, size: 1 }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
});