import Task from '../models/task.js';

export const getAllTask = async (req,res)=>{
    console.log("Before try in getAllTask");
    try {
        console.log("Inside try in getAllTask");
        const allTasks = await Task.find({});
        res.status(200).json({allTasks});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

export const getSingleTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const singleTask = await Task.findOne({_id:taskID});
        if(!singleTask){
            return res.status(404).json({msg:`No task with id:${taskID}`});
        }
        res.status(500).json({singleTask}); 
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

export const updateTask = async (req, res)=>{
    try {
        const {id:taskID}= req.params;
        const updateTask = await Task.findOneAndUpdate({_id:taskID}, req.body,{
            new:true,
            runValidators:true
        });
        if(!updateTask){
            res.status(404).json({msg:`No task with id: ${taskID}`});
        }
        res.status(500).json({updateTask});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

export const deleteTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const deleteTask = await Task.findOneAndDelete({_id:taskID});
        if(!deleteTask){
           return res.status(404).json({msg:`No task with id :${taskID}`});  
        }
        res.status(200).json({deleteTask});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

export const createTask = async (req,res)=>{
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({newTask});
    } catch (error){
        res.status(500).end();
    }
   
}