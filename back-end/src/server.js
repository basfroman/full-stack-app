import express from "express";
import { MongoClient } from 'mongodb';


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

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => courses.findOne({ id: id })));
    }

    async function findCourse(id) {
        return await courses.findOne({ id: id });
    }
    
    app.get('/courses', async (_, res) => {
        res.json(await courses.find({}).toArray());
    });
    
    app.get('/courses/:courseId', async (req, res) => {
        const course = await findCourse(req.params.courseId);
        res.json(course ? course : {});
    });
    
    app.get('/users/:userId/cart', async (req, res) => {
        const cartItems = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populateCartIds(cartItems ? cartItems.cartItems : []);
        res.json(populatedCart);
    });
    
    app.post('/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;
        const courseId = req.body.id;
        
        if (await findCourse(courseId)) {
            await db.collection('users').updateOne({'id': userId}, {
                $addToSet: {cartItems: courseId},
            });

        } else {
            res.statusMessage = 'The course to be added was not found.'
        }

        const cartItems = await db.collection('users').findOne({ id: userId });
        const populatedCart = await populateCartIds(cartItems ? cartItems.cartItems : []);
        res.json(populatedCart);
    });
    
    app.delete('/users/:userId/cart/:courseId', async (req, res) => {
        const userId = req.params.userId;
        const courseId = req.params.courseId;

        await db.collection('users').updateOne({ id: userId}, {
            $pull: { cartItems: courseId },
        });

        const cartItems = await db.collection('users').findOne({ id: userId });
        const populatedCart = await populateCartIds(cartItems ? cartItems.cartItems : []);
        res.json(populatedCart);
    });
    
    app.listen(8000, () => {
        console.log('Server is listening on port 8000')
    });    
}

startServer();
