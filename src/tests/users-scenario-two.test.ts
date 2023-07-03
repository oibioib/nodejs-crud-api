import supertest from 'supertest';

import { DB } from '@/lib/db';
import { createServer } from '@/lib/server';
import { UserIdType } from '@/types';

const db = new DB();
const server = createServer(db);

const invalidId: UserIdType = 'invalid-uuid';
const validId: UserIdType = '3ff1c3e4-206b-4047-91d3-c33388972ee9';

const newUser = {
  username: 'Pavel',
  age: 38,
  hobbies: ['coding'],
};

describe('Users scenario TWO (test uuid)', () => {
  describe('Server should answer with status code 400 if userId is not uuid', () => {
    test('Get /api/users/{userId}', async () => {
      const response = await supertest(server)
        .get(`/api/users/${invalidId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    });

    test('PUT /api/users/{userId}', async () => {
      const response = await supertest(server)
        .put(`/api/users/${invalidId}`)
        .set('Accept', 'application/json')
        .send(newUser);

      expect(response.status).toEqual(400);
    });

    test('DELETE /api/users/{userId}', async () => {
      const response = await supertest(server)
        .delete(`/api/users/${invalidId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
    });
  });

  describe('Server should answer with status code 404 if user with id === userId is not exist', () => {
    test('Get /api/users/{userId}', async () => {
      const response = await supertest(server)
        .get(`/api/users/${validId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
    });

    test('PUT /api/users/{userId}', async () => {
      const response = await supertest(server)
        .put(`/api/users/${validId}`)
        .set('Accept', 'application/json')
        .send(newUser);

      expect(response.status).toEqual(404);
    });

    test('DELETE /api/users/{userId}', async () => {
      const response = await supertest(server)
        .delete(`/api/users/${validId}`)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(404);
    });
  });
});
