const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);



test('GET /datasets', async () => {
    await api
    .get('/datasets')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test('Create user', async () => {
    const newUser = {
        username: 'test',
        password: 'test'
    }

    await api
    .post('/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
});

test('Login', async () => {
    const user = {
        username: 'test',
        password: 'test'
    }

    await api
    .post('/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
});

test('Delete user', async () => {

    let token = '';

    const user = {
        username: 'testaaja',
        password: 'testaaja'
    }

    const response = await api
    .post('/login')
    .send(user);
    token = response.body.token
    console.log(token);

    await api
    .post('/users/deleteUser')
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

afterAll(() => {
    mongoose.connection.close();
});