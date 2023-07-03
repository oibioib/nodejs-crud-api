import supertest from 'supertest';

import { DB } from '@/lib/db';
import { createServer } from '@/lib/server';
import { UserIdType } from '@/types';

const db = new DB();
const server = createServer(db);

const newUser = {
  username: 'Pavel',
  age: 38,
  hobbies: ['coding'],
};

const newUserWithNewAge = { ...newUser, age: 30 };

describe('Users scenario ONE (test basic operations)', () => {
  let userId: UserIdType;

  test('Should get empty users array for first api call', async () => {
    const response = await supertest(server).get('/api/users').set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('Should create new user and receive it from api', async () => {
    expect.assertions(3);

    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeDefined();
    userId = response.body.id;
    expect(response.body).toStrictEqual({ id: userId, ...newUser });
  });

  test('Should get the newly created user', async () => {
    const response = await supertest(server)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ id: userId, ...newUser });
  });

  test('Should update user data', async () => {
    const response = await supertest(server)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .send(newUserWithNewAge);

    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ id: userId, ...newUserWithNewAge });
  });

  test('Should delete created user', async () => {
    const response = await supertest(server)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(204);
  });

  test("Shouldn't get deleted user", async () => {
    const response = await supertest(server)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(404);
  });
});
