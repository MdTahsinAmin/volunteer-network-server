const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
require('dotenv').config()


const password = 'gpPHPaHZ4KaGM3e8';

const uri = `mongodb+srv://volunteer_network:${password}@cluster0.ntqwp.mongodb.net/volunteerdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});




const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})



client.connect(err => {
  const collection = client.db("volunteerdb").collection("network");
   
  app.post('/addNewEvent',(req,res)=>{
       const newEvent = req.body;
       console.log(newEvent);
  })

});





const port = 5200
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})