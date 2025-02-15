import express from 'express';
import routes from './routes/task.js';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

//Middileware to parse the JSON data send in body
app.use(express.json());
app.use(express.static('./frontEnd'));
app.use('/api/v1/tasks', routes);
//for invalid routes
app.use((req,res)=>{res.status(404).send("Route Not Found")});
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, console.log("Server Tutorial Started...."));
    } catch (error) {
        console.log(error);
    }
}

start();
