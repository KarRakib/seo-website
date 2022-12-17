const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require("stripe")('sk_test_51M63ypKYn4DrBUBdyzGgWS4dhzYot6w80dBlceUtQBfacZP3kb0emVD2wwWBA8xkk1RRnjl2W3wdJ6XRi1CUJCGE00GwrNtyGY');
require('dotenv').config();
const port = process.env.PORT || 7000

// middleware
app.use(cors())
app.use(express.json());

console.log(process.env.USER_NAME,);

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster7.fzzeo8a.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const why_hireCollection = client.db('SEO-WEB').collection('Why')
        const ourServicesCollection = client.db('SEO-WEB').collection('Our-Services')
        const priceCollection = client.db('SEO-WEB').collection('Price-planning')

        app.get('/why-hire', async (req, res) => {
            const query = {}
            const result = await why_hireCollection.find(query).toArray()
            res.send(result)
        });
        app.get('/our-services', async (req, res) => {
            const query = {}
            const result = await ourServicesCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/price', async (req, res) => {
            const query = {}
            const result = await priceCollection.find(query).toArray()
            res.send(result)
        })
        // app.post('/products', async (req, res) => {
        //     const product = req.body;
        //     const result = await productsCollection.insertOne(product);
        //     res.send(result)
        // })
        // app.put('/products', async (req, res) => {
        //     const id = req.body.id;
        //     const comment = req.body.feedback
        //     console.log(comment);
        //     console.log(id);
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true }
        //     const updateDoc = {
        //         $set: {
        //             comment: comment
        //         }
        //     }
        //     const result = await productsCollection.updateOne(filter, updateDoc, options)
        //     res.send(result)
        //     // const query = {color}
        //     // const result = await
        // })
        // app.delete('/comment/:id', async (req, res) => {
        //     const id = req.params.id
        //     console.log(id, 'd');
        //     const query = { _id: ObjectId(id) }
        //     const result = await productsCollection.deleteOne(query)
        //     res.send(result)
        // })
        // app.get('/products', async (req, res) => {
        //     const query = {};
        //     const result = await productsCollection.find(query).toArray();
        //     res.send(result)
        // })
        // app.get('/product/:id', async (req, res) => {
        //     const id = req.params
        //     const query = { _id: ObjectId(id) };
        //     const result = await productsCollection.findOne(query);
        //     res.send(result)
        // })

    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Project-1 Website!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})