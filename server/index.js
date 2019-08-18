const express = require('express')
const app = express()
const {segemntsArray, searchByDate} = require('./helpers.js')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const exampleData = require('../data/tracking.json')

app.get('/', (req, res) => {
  // TODO(Task 1): Split tracking data into trip segments for example by using the time property.
  const segments = segemntsArray(exampleData);
  res.send(segments);
})

app.get('/location/:when', (req, res) => {
  // TODO(Task 2): Return the tracking data closest to `req.params.when` from `exampleData`.
  console.log(req.params.when)
  res.send({date: req.params.when})
  // const results = searchByDate(exampleData,req.params.when)
  // if(results){
  //   return res.send({results})
  // }
  // res.send({error:'No results found!'})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
