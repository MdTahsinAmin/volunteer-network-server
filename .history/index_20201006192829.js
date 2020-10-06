const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PASSWORD}@cluster0.ntqwp.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload());



app.get('/', (req, res) => {
  res.send('Hello World!')
})


client.connect(err => {
  const eventCollection = client.db(`${process.env.DATA_BASE_NAME}`).collection("network");
  const volunteersCollection = client.db(`${process.env.DATA_BASE_NAME}`).collection("volunteers");
  app.post('/addNewEvent',(req,res)=>{
       ///const newEvent = req.body;
       const file = req.files.imgaes;
       const newEvent ={
          eventTitle : req.body.eventTitle,
          eventDate : req.body.eventDate,
          description : req.body.description,
          images : file.name
       }
     
       eventCollection.insertOne(newEvent)
       .then(result =>{
            res.redirect('/adminPanel')
       })
})

app.get('/allEvents',(req,res)=>{
    eventCollection.find({}).toArray((err,documents)=>{
        res.send(documents);
    })
})

app.post('/newVolunteer',(req,res)=>{
   const newVolunteer = req.body;
   volunteersCollection.insertOne(newVolunteer).then(result =>{
        console.log('result');
   })

})


app.get('/loginUserInformation',(req,res)=>{
    console.log(req.headers.authorization);
     volunteersCollection.find({email:req.query.email})
     .toArray((err,documents)=>{
        res.send(documents);
     })
})


})

const port = 5200;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})