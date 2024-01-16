import express from "express";
import { cartItems as cartItemsRow, courses as coursesRow} from './temp-data';

let cartItems = cartItemsRow;
let courses = coursesRow;

const app = express();
app.use(express.json());


app.get('/courses', (req, res) => {
    res.json(courses);
})

function populateCartIds(ids) {
    return ids.map(id => courses.find(course => course.id === id));
}

app.get('/cart', (req, res) => {
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.post('/cart', (req, res) => {
    const courseId = req.body.id;
    cartItems.push(courseId);
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.delete('/cart/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    cartItems = cartItems.filter(id => id !==courseId)
    const populatedCart = populateCartIds(cartItems);
    res.json(populatedCart);
})

app.get('/courses/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const course = courses.find(course => course.id === courseId);
    res.json(course);
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})