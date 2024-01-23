import express from "express";
import { MongoClient } from 'mongodb';
import path from 'path';
import { connected } from "process";


const dbUrlPattern = 'mongodb+srv://<user>:<password>@<db_name>.ipb1usb.mongodb.net/?retryWrites=true&w=majority'
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbName = process.env.DB_NAME
const dbURL = dbUrlPattern.replace('<user>', dbUser).replace('<password>', dbPassword).replace('<db_name>', dbName)

const client = new MongoClient(dbURL);

async function startServer() {

    await client.connect();
    const db = client.db(dbName);
    const courses = db.collection('courses');

    const app = express();
    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, '../assets/images')));

    async function getUser(id) {
        let user = await db.collection('users').findOne({ id: id });
        if (!user) {
            db.collection('users').insertOne({id: id, cartItems: []});
            user = await db.collection('users').findOne({ id: id });
        }
        return user
    }

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => courses.findOne({ id: id })));
    }

    async function findCourse(id) {
        return await courses.findOne({ id: id });
    }
    
    app.get('/api/courses', async (_, res) => {
        res.json(await courses.find({}).toArray());
    });
    
    app.get('/api/courses/:courseId', async (req, res) => {
        const course = await findCourse(req.params.courseId);
        res.json(course ? course : {});
    });
    
    app.get('/api/users/:userId/cart', async (req, res) => {
        const user = await getUser(req.params.userId);
        const populatedCart = await populateCartIds(user ? user.cartItems : []);
        res.json(populatedCart);
    });
    
    app.post('/api/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;

        await db.collection('users').updateOne({id: userId}, {
            $addToSet: {cartItems: req.body.id},
        });

        const user = await getUser(req.params.userId);
        const populatedCart = await populateCartIds(user ? user.cartItems : []);
        res.json(populatedCart);
    });
    
    app.delete('/api/users/:userId/cart/:courseId', async (req, res) => {
        const userId = req.params.userId;
        const courseId = req.params.courseId;

        await db.collection('users').updateOne({ id: userId}, {
            $pull: { cartItems: courseId },
        });

        const user = await getUser(req.params.userId);
        const populatedCart = await populateCartIds(user ? user.cartItems : []);
        res.json(populatedCart);
    });
    
    app.listen(8000, () => {
        console.log('Server is listening on port 8000')
    });    
}

startServer();
