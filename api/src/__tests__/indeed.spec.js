/**
 * @jest-environment node
 */
const app = require('../server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

test('gets jobs from indeed', async (done)=>{
  const res = await request.get('/indeed?position=developer&location=remote')
  expect(res.status).toBe(200)
  done()
}, 10000)