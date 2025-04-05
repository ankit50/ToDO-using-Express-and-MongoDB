import Task from '../models/task.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { createCustomError } from "../errors/customError.js";

export const getAllTask = asyncWrapper(async (req, res) => {
        const allTasks = await Task.find({});
        res.status(200).json({ allTasks });
});

export const getSingleTask = asyncWrapper(async (req, res, next) => {
        const { id: taskID } = req.params;
        const singleTask = await Task.findOne({ _id: taskID });
        if (!singleTask) {
                return next(createCustomError(`No task with id:${taskID}`, 404));
        }
        res.status(500).json({ singleTask });
});

export const updateTask = asyncWrapper(async (req, res, next) => {
        const { id: taskID } = req.params;
        const updateTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
                new: true,
                runValidators: true
        });
        if (!updateTask) {
                return next(createCustomError(`No task with id:${taskID}`, 404));
        }
        res.status(500).json({ updateTask });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
        const { id: taskID } = req.params;
        const deleteTask = await Task.findOneAndDelete({ _id: taskID });
        if (!deleteTask) {
                return next(createCustomError(`No task with id:${taskID}`, 404));
        }
        res.status(200).json({ deleteTask });
});


export const createTask = asyncWrapper(async (req, res) => {
        const newTask = await Task.create(req.body);
        res.status(201).json({ newTask });
});