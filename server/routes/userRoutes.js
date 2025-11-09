import express from "express"
import { createUser, deleteTodo, getPageNation, getTodoData, upDateUsers } from "../Controllers/todos.js"

const UserRoutes = express.Router()

UserRoutes.post("/createTodo",createUser)
UserRoutes.get("/getTodo",getPageNation)
UserRoutes.put("/updateTodo/:id",upDateUsers)
UserRoutes.delete("/deleteTodo/:id",deleteTodo)

export default UserRoutes