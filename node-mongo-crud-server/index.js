const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();

// Middleware
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

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        // GET:Id
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;

            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);

            console.log("Find User: ", result);
            res.json(result);
        })

        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            
            console.log("got new user", req.body);
            console.log("Added user", result)
            res.json(result);
        })

        // UPDATE / PUT
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser =  req.body;

            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                  name: updatedUser.name,
                  email: updatedUser.email
                },
              };

            const result = await userCollection.updateOne(filter, updateDoc, options);

            console.log("updating user ", result);
            res.json(result);
        })

        // DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;

            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);

            console.log('deleting user with id ', result);
            res.json(result);
        })

        // const doc = {
        //     name: 'Special Two',
        //     email: 'special2@hotmail.com',
        //     phone: '01433333334444'
        // }

        // const result = await userCollection.insertOne(doc);

        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
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