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
export const createTask = (req,res)=>{
    const {id,Task}= req.body;
    console.log(id,Task); 
    res.send(`Task created for id: ${id} and ${Task}`);
}
export default getAllTask;