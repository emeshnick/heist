const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))

router.use('/conversation', require('./conversation'))

router.use('/markers', require('./markers'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
