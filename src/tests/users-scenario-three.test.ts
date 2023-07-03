import supertest from 'supertest';

import { DB } from '@/lib/db';
import { createServer } from '@/lib/server';

const db = new DB();
const server = createServer(db);

const newUserWithoutUsername = {
  age: 38,
  hobbies: ['coding'],
};

const newUserWithoutAge = {
  username: 'Pavel',
  hobbies: ['coding'],
};

const newUserWithoutHobbies = {
  username: 'Pavel',
  age: 38,
};

const newUserWithBadHobbies = {
  username: 'Pavel',
  age: 38,
  hobbies: [100000],
};

const newUserWithBadHobbiesType = {
  username: 'Pavel',
  age: 38,
  hobbies: 100000,
};

describe('Users scenario THREE (test creating user with wrong params)', () => {
  test("Shouldn't create new user without username", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUserWithoutUsername);

    expect(response.status).toEqual(400);
  });

  test("Shouldn't create new user without age", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUserWithoutAge);

    expect(response.status).toEqual(400);
  });

  test("Shouldn't create new user without hobbies", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUserWithoutHobbies);

    expect(response.status).toEqual(400);
  });

  test("Shouldn't create new user with bad hobbies values", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUserWithBadHobbies);

    expect(response.status).toEqual(400);
  });

  test("Shouldn't create new user with bad hobbies values", async () => {
    const response = await supertest(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(newUserWithBadHobbiesType);

    expect(response.status).toEqual(400);
  });
});
