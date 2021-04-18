const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('bson');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

console.log(process.env.DB_USER);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cvjjn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);


const app = express()

// app.use(bodyParser.json())

app.use(express.json());

app.use(cors());



const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection err', err)
  const serviceCollection = client.db("mohanondaIT").collection("itService");
  const adminCollection = client.db("mohanondaIT").collection("adminPanel");
  const ordersCollection = client.db("mohanondaIT").collection("serviceOrder");
  const reviewCollection = client.db("mohanondaIT").collection("review");
  console.log('Database connected successfully.');


  app.get('/events', (req, res) => {
    serviceCollection.find()
      .toArray((err, items) => {
        // console.log('From Database Images.', items);
        res.send(items)
      })
  })

  app.get('/testimonial', (req, res) => {
    reviewCollection.find()
      .toArray((err, test) => {
        // console.log('From Database Images.', items);
        res.send(test)
      })
  })

  app.get('/orderDetails', (req, res) => {
    serviceCollection.find()
      .toArray((err, fruit) => {
        // console.log('From Database Images.', items);
        res.send(fruit)
      })
  })

  app.post('/totalOrders', (req, res) => {
    const email = req.body.email;
    adminCollection.find({ email: email })
      .toArray((err, admin) => {
        // console.log('From Database Images.', items);
        if (admin.length === 0) {
          filter.email = email;
        }
        ordersCollection.find()
          .toArray((err, total) => {
            // console.log('From Database Images.', items);
            res.send(total)
          })
      })

  })

  app.get('/orders', (req, res) => {
    console.log(req.query.email);
    ordersCollection.find({ email: req.query.email })
      .toArray((err, order) => {
        // console.log('From Database Images.', items);
        res.send(order)
      })
  })

  app.post('/addService', (req, res) => {
    const newEvent = req.body;
    //  console.log('adding new event', newEvent);
    serviceCollection.insertOne(newEvent)
      .then(result => {
        //  console.log('event count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addAdmin', (req, res) => {
    const newEvent = req.body;
    //  console.log('adding new event', newEvent);
    adminCollection.insertOne(newEvent)
      .then(result => {
        //  console.log('event count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    //  console.log('adding new event', newEvent);
    reviewCollection.insertOne(newReview)
      .then(result => {
        //  console.log('event count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addOrder', (req, res) => {
    const order = req.body;
    // console.log(product);
    ordersCollection.insertOne(order)
      .then(result => {
        // console.log(result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.delete('/delete/:id', (req, res) => {
    serviceCollection.deleteOne({ _id: ObjectId(req.params.id) })
      .then(result => {
        // console.log(result);
        res.send(result.deletedCount > 0);
      })
  })

})



app.get('/', (req, res) => {
  res.send('Hello World! New Project.')
})

app.listen(process.env.PORT || port)