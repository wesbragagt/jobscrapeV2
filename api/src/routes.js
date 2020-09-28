const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({message: 'ok'})
})

router.get('/indeed', require('./indeed').getjobs)

module.exports = router