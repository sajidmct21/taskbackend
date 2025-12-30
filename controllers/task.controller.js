import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";


// Create a task
export const creatTask = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.headers;
  const newTask = new Task({ title, description });
  const savedTask = await newTask.save();
  const taskId = savedTask._id;
  await User.findByIdAndUpdate(id, { $push: { tasks: taskId } });
  //   return res.status(201).json({ message: "Task is created" });
  res.status(201).json(new ApiResponse(201, "Task is created", savedTask));
});

// Get All Tasks
export const getAllTasksByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.headers;
  if (!id) {
    throw new ApiError(400, "User id is required");
  }

  const userData = await User.findById(id).populate({
    path: "tasks",
    options: { sort: { createdAt: -1 } },
  });

  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, "Users", userData));
});


// Get Importanta Task
export const getAllImportantTasksByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.headers;
  if (!id) {
    throw new ApiError(400, "User id is required");
  }

  const userData = await User.findById(id).populate({
    path: "tasks",
    match:{important:true},
    options: { sort: { createdAt: -1 } },
  });

  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  const importantTasksData = userData.tasks
  res.status(200).json(new ApiResponse(200, "Important Task data", importantTasksData));
});

// Get All complete tasks
export const getAllCompleteTasksByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.headers;
  if (!id) {
    throw new ApiError(400, "User id is required");
  }

  const userData = await User.findById(id).populate({
    path: "tasks",
    match:{complete:true},
    options: { sort: { createdAt: -1 } },
  });

  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  const completeTasksData = userData.tasks
  res.status(200).json(new ApiResponse(200, "Completed Task data", completeTasksData));
});

// Get All incompleted Tasks
export const getAllIncompleteTasksByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.headers;
  if (!id) {
    throw new ApiError(400, "User id is required");
  }

  const userData = await User.findById(id).populate({
    path: "tasks",
    match:{complete:false},
    options: { sort: { createdAt: -1 } },
  });

  if (!userData) {
    throw new ApiError(404, "User not found");
  }
  const incompleteTasksData = userData.tasks
  res.status(200).json(new ApiResponse(200, "Important Incomplete Tasks", incompleteTasksData));
});

// Delete Task
export const deleteTask = asyncHandler(async(req, res,next)=>{
    const {id} = req.params
    const userId = req.headers.id
    if(!id){
        throw new ApiError(400,'Id is required')
    }
    if(!userId){
        throw new ApiError(400,'Invalid User Id')
    }
    await Task.findByIdAndDelete(id)
    await User.findByIdAndUpdate(userId,{$pull:{tasks:id}},{new:true})
    res.status(200).json(new ApiResponse(200,'Task is deleted', ''))
})

// Update Task
export const updateTask = asyncHandler(async(req, res, next)=>{
    const {id} = req.params
    const {title, description} = req.body
    if(!id){
        throw new ApiError(400,'Id is required')
    }
    await Task.findByIdAndUpdate(id,{title,description})
    res.status(200).json(new ApiResponse(200,'Task is updated', ''))
})

// Update Important task
export const updateImportantTask = asyncHandler(async(req, res, next)=>{
    const {id} = req.params
    if(!id){
        throw new ApiError(400,'Id is required')
    }
    const taskData = Task.findById(id)
    const impTask = taskData.important
    await Task.findByIdAndUpdate(id,{important:!impTask})
    res.status(200).json(new ApiResponse(200,'Task is updated', ''))
})

// update complete Task
export const updateCompleteTask = asyncHandler(async(req, res, next)=>{
    const {id} = req.params
    if(!id){
        throw new ApiError(400,'Id is required')
    }
    const taskData = Task.findById(id)
    const completeTask = taskData.complete
    await Task.findByIdAndUpdate(id,{complete:!completeTask})
    res.status(200).json(new ApiResponse(200,'Task is updated', ''))
})
