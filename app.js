import express from 'express';
import routes from './routes/task.js';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
import notFound from './middlewares/notFound.js';
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();
const app = express();

//Middileware to parse the JSON data send in body
app.use(express.json());
app.use(express.static('./frontEnd'));
app.use('/api/v1/tasks', routes);
//for invalid routes
app.use(notFound);                                        
//for handling errors
app.use(errorHandler);
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, console.log("Server Tutorial Started...."));
    } catch (error) {
        console.log(error);
    }
}
start();
