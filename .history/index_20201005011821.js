const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
const port = 5200
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})