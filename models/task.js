import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name Required"],
        trim:true,
        maxlength: [20, "Cannot be more than 20 character"]
    },
    completed:{
        type:Boolean,
        default:false
    }
});
export default mongoose.model('task', taskSchema);