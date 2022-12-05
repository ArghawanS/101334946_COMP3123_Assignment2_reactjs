"use strict"
const express = require("express")
const routes = express.Router()
const endpoints = require("../endpoints/user")
const UserModel = require("../../models/UserModel");

routes.post(
	endpoints.signUp.path,
	async (request, response) => {
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.signUp.failureResCode)
				.send({
					message: "User account content cannot be empty"
				})
			}
		const newUser = new UserModel(request.body)
		try {
			await newUser.save()
			return response
				.status(endpoints.signUp.successResCode)
				.send({
					message: `New user ${newUser.username} added`
				})
		} catch (error) {
			return response
				.status(endpoints.signUp.failureResCode)
				.send({
					message: `Error creating new user ${newUser.username}. Double check connection or new user credentials and try again!`
				})
		}
	}
)

routes.post(
	endpoints.login.path,
	async (request, response) => {
		// Extract request info
		const username = request.body.username
		const email = request.body.email
		const password = request.body.password
		
		try {
			const allUsers = await UserModel
				.find()
				.then((results) => {
					return results.map(eachUser => {
						return {
							username: eachUser.get('username'),
							email: eachUser.get('email'),
							password: eachUser.get('password')
						}
					})
				})
			
			let isValidLoginAttempt = false
			allUsers.forEach(anyUser => {
				// If user logs in by a matching username or email, with matching password
				if (
					(anyUser.username && (anyUser.username === username) && (anyUser.password === password)) ||
					(anyUser.email && (anyUser.email === email) && (anyUser.password === password))
				) {
					isValidLoginAttempt = true
				}
			})
			
			if (isValidLoginAttempt) {
				return response
					.status(endpoints.login.successResCode)
					.send({
						"status": true,
						"username": username,
						"email": email,
						"message": "User logged in successfully"
					})
			} else {
				return response
					.status(endpoints.login.failureResCode)
					.send({
						"status": false,
						"username": username,
						"email": email,
						"message": "Cannot log in. Unregistered username or password"
					})
			}
		} catch (error) {
			return response
				.status(500)
				.send({
					"message": "Connection error. Try again!"
				})
		}
	}
)
module.exports = routes
