var path = require('path')
var express = require('express')

var app = express()

app.use(express.static(path.join(__dirname, '../dist')))

app.get(function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"))
})

app.listen(8080, () => {
  console.log('App started at http://localhost:8080')
})
