const express = require('express')
const router = express.Router()

router.get('/simpleRoute', (req, res) => {
  res.send(JSON.stringify("Here I am. Rock you like a hurricane."))
})

router.get('/requiredParamRoute/:field', (req, res) => {
    // example request: http://localhost:3000/optionalParamsRoute/jona
    params = req.params
    res.send(JSON.stringify(`You sent ${params['field']}`))
  })

  router.get('/optionalParamsRoute', (req, res) => {
    // example request: http://localhost:3000/optionalParamsRoute/?name=jona&age=27
    params = req.query
    res.send(JSON.stringify(`You sent ${params}`))
  })

module.exports = router
