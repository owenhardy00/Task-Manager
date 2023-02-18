const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const user1 = {
    name: 'Mike Wazowski',
    email: 'mike@monsters.inc',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()

    await new User(user1).save()
})

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Owen',
        email: 'owen@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should log in existing user', async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200)
})

test('Should not login a non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: 'thisisdefinitleythewrongpassword'
    }).expect(400)
})