
"use strict"
const express = require("express")
const mongoose = require('mongoose')
const loginInfo = require("./constants/MongoLoginInfo")
const userRoutes = require("./api/routes/user")
const employeeRoutes = require("./api/routes/employees")

const app = express()

const DB_URL = `mongodb+srv://Assignment-1:5rAAasqEN842SOEt@cluster0.jsbnmvo.mongodb.net/?retryWrites=true&w=majority`
// Middleware to handle form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.Promise = global.Promise

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connected to mongoDB database server");
	})
	.catch(err => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	})

app.use("/api/user", userRoutes)
app.use("/api/emp/employees", employeeRoutes)

app.route("/")
	.get((request, response) => {
		response.send("<h1>COMP3123 Assignment 1</h1>")
	})
	
app.listen(process.env.PORT || 3000)
