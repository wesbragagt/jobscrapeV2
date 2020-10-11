/**
 * @jest-environment node
 */
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

test('gets jobs from indeed', async (done)=>{
  const res = await request.get('/indeed?q=developer&l=remote')
  expect(res.status).toBe(200)
  expect(res.body.response.length).toBeGreaterThan(0)
  done()
}, 10000)
test('get jobs paginated from indeed', async (done)=>{
  const res = await Promise.all([
    request.get('/indeed?q=developer&l=remote'),
    request.get('/indeed?q=developer&l=remote&start=20')
  ])
  const [promise1, promise2] = res
  expect(promise1.status).toBe(200)
  expect(promise2.status).toBe(200)
  expect(promise1.body.response.length).toBeGreaterThan(0)
  expect(promise2.body.response.length).toBeGreaterThan(0)
  done()
}, 10000)