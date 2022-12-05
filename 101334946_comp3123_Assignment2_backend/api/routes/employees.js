
"use strict"
const express = require("express")
const routes = express.Router()
const endpoints = require("../endpoints/employees")
const EmployeesModel = require("../../models/EmployeesModel")
routes.get(
	endpoints.getAll.path,
	async (request, response) => {
		try {
			const employees = await EmployeesModel.find()
			return response
				.status(endpoints.getAll.successResCode)
				.send(employees)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)
routes.post(
	endpoints.createNew.path,
	async (request, response) => {
		// Validate request
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.createNew.failureResCode)
				.send({
					message: "Employee account content cannot be empty"
				})
		}
		const newEmployee = new EmployeesModel(request.body)
		try {
			await newEmployee.save()
			return response
				.status(endpoints.createNew.successResCode)
				.send({
					message: `New employee ${newEmployee.full_name} added`
				})
		} catch (error) {
			return response
				.status(endpoints.createNew.failureResCode)
				.send({
					message: `Error creating new employee ${newEmployee.full_name}. Double check connection or new employee credentials and try again!`
				})
		}
	}
)
routes.get(
	endpoints.getById.path,
	async (request, response) => {
		let empIdFromUrl = request.params.eid
		
		try {
			const employee = await EmployeesModel
				.findById(empIdFromUrl)
				.select('-_id first_name last_name email gender salary')
		
			
			if (!employee) {
				return response
					.status(endpoints.getById.failureResCode)
					.send({
						message: `No employee with id ${empIdFromUrl} found`
					})
			}
			
			return response
				.status(endpoints.getById.successResCode)
				.send(employee)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

routes.put(
	endpoints.updateById.path,
	async (request, response) => {
		let empIdFromUrl = request.params.eid
		
	
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.updateById.badRequestResCode)
				.send({
					message: "Missing update employee account content"
				})
		}
		
		try {
			const empToUpdate = await EmployeesModel
				.findByIdAndUpdate(/* id: */ empIdFromUrl, /* with: */ request.body)
			
			const updatedEmp = await EmployeesModel.findById(empToUpdate._id)
			
			if (!updatedEmp) {
				return response
					.status(endpoints.updateById.failureResCode)
					.send({ message: `No emp with id ${empIdFromUrl} found` })
			}
			
			return response
				.status(endpoints.updateById.successResCode)
				.send(updatedEmp)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

routes.delete(
	endpoints.deleteById.path,
	async (request, response) => {
		let empIdFromUrl = request.query.eid
		
		if (!empIdFromUrl) {
			return response
				.status(endpoints.deleteById.badRequestResCode)
				.send({
					message: "Delete by id missing eid value"
				})
		}
		
		try {
			const deletedEmp = await EmployeesModel.findByIdAndDelete(empIdFromUrl)
			
			if (!deletedEmp) {
				return response
					.status(endpoints.deleteById.failureResCode)
					.send({ message: `No employee with id ${empIdFromUrl} found to delete` })
			}
			
			return response
				.status(endpoints.deleteById.successResCode)
				.end()
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)
module.exports = routes
