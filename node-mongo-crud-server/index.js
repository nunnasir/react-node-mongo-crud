const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Db User: my-db-user-1
// Db Password: srKZUmMszO1C6jpP

const uri = "mongodb+srv://my-db-user-1:srKZUmMszO1C6jpP@cluster0.whkff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const userCollection = database.collection("users");

        const doc = {
            name: 'Special Two',
            email: 'special2@hotmail.com',
            phone: '01433333334444'
        }

        const result = await userCollection.insertOne(doc);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);


// client.connect(err => {
//     const collection = client.db("foodMaster").collection("users");
//     // perform actions on the collection object
//     const user = { name: 'Nasir Uddin', email: 'nasir@gmail.com', phone: '0123433333' };
//     collection.insertOne(user)
//         .then(() => {
//             console.log("Insert Success");
//         })

//     // client.close();
// });


app.get('/', (req, res) => {
    res.send("Hello People");
})

app.listen(port, () => {
    console.log(`Listener work with port: ${port}`);
})