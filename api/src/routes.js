const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
router.get('/', (req, res) => {
  res.json({message: 'ok'})
})

router.get('/todos', (req, res) => {
  const todos = [
    {id: 1, name: 'clean up', status: 'open'},
    {id: 1, name: 'cook', status: 'done'}
  ]
  res.json({data: todos})
})


router.get('/todos/:todo', (req, res) => {
  res.json({id: 1, name: 'clean up', status: 'open'})
})

module.exports = router