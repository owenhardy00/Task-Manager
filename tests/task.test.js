const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    user1Id,
    user1,
    user2Id,
    user2,
    task1,
    task2,
    task3,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)
})

test('Should fetch all user\'s tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

        expect(response.body.length).toEqual(2)
        
})

test('Second user cannot delete first user\'s task', async () => {
    const response = await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)

        const task = await Task.findById(task1._id)
        expect(task).not.toBeNull()
})