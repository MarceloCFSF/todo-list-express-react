import request from "supertest";
import { App } from "../app";
import { TaskRouter } from "../routes/taskRouter";
import { MockDatabase } from "./mocks/mockDatabase";

const newTask = {
  title: 'Task',
  description: 'Description',
  status: 'pending'
};

const updateTask = {
  title: 'Update Task',
  description: 'Update Description',
  status: 'pending'
};

describe('Tasks', () => {
  let app: App;
  let database: MockDatabase;

  beforeAll(async () => {
    app = new App(3000);
    database = new MockDatabase();

    const router = new TaskRouter(database);
    app.addRoute('/tasks', router.getRouter());
  });

  afterEach(async () => {
    await database.query("TRUNCATE TABLE tasks")
  });

  it('Should return zero tasks', async () => {
    const response = await request(app.getApplication())
      .get("/tasks")
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('Should create a task', async () => {
    const response = await request(app.getApplication())
      .post("/tasks")
      .send(newTask)
      .expect(201);

    expect(response.body).toMatchObject(newTask);
    expect(response.body).toHaveProperty("id");

    const tasks = await request(app.getApplication())
      .get(`/tasks`)
      .expect(200);

    expect(tasks.body.length).toBe(1);
    expect(tasks.body).toMatchObject([newTask]);
  });

  it('Should return task by id', async () => {
    const createResponse = await request(app.getApplication())
      .post('/tasks')
      .send(newTask)
      .expect(201);

    const task = createResponse.body;

    const response = await request(app.getApplication())
      .get(`/tasks/${task.id}`)
      .expect(200);

    expect(response.body).toMatchObject(newTask);
  });

  it('Should update a task', async () => {
    const createResponse = await request(app.getApplication())
      .post('/tasks')
      .send(newTask)
      .expect(201);

    const id = createResponse.body.id;

    const updateResponse = await request(app.getApplication())
      .put(`/tasks/${id}`)
      .send(updateTask)
      .expect(200);

    expect(updateResponse.body).toMatchObject(updateTask);

    const response = await request(app.getApplication())
      .get(`/tasks/${id}`)
      .expect(200);

    expect(response.body).toMatchObject(updateTask);
  });

  it('Should delete a task', async () => {
    const createResponse = await request(app.getApplication())
      .post('/tasks')
      .send(newTask)
      .expect(201);

    const id = createResponse.body.id;

    const deleteResponse = await request(app.getApplication())
      .delete(`/tasks/${id}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({
      message: "Successful deleted task"
    })

    const afterDelete = await request(app.getApplication())
      .get(`/tasks`)
      .expect(200);

    expect(afterDelete.body.length).toBe(0);
  });
});