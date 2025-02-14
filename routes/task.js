import express from 'express'
import {getAllTask,getSingleTask, updateTask, deleteTask, createTask} from '../controllers/task.js';
const router = express.Router();

router.route('/').get(getAllTask);
router.route('/').post(createTask);
router.route('/:id').get(getSingleTask);
router.route('/:id').delete(deleteTask);
router.route('/:id').patch(updateTask);
export default router;