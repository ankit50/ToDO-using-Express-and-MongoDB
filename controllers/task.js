import Task from '../models/task.js';

export const getAllTask = (req,res)=>{
    res.send("Get All Task");
}
export const getSingleTask = (req,res)=>{
    res.send("Get single Task");
}
export const updateTask = (req, res)=>{
    res.send("Update Task");
}
export const deleteTask = (req,res)=>{
    res.send("Delete Task");
}
export const createTask = async (req,res)=>{
    const task = await Task.create(req.body);
    res.status(201).json({task});
   
}
export default getAllTask;