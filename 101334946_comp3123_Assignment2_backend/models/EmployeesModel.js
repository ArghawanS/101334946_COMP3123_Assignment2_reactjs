const mongoose = require('mongoose')
const projectSchema = require("../constants/ProjectSchema")
const RegEx = require("../constants/RegEx")

const employeesSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
		maxLength: 100
	},
	last_name: {
		type: String,
		required: true,
		maxLength: 50
	},
	email: {
		type: String,
		unique: true,
		maxLength: 50,
		validate(value) {
			return !/RegEx.forValidEmail/.test(value)
		}
	},
	gender: {
		type: String,
		lowercase: true,
		enum: ['male', 'female', 'other']
	},
	salary: {
		type: Number
	}
}, { collection: projectSchema.employeeCollection })

employeesSchema
	.virtual('full_name')
	.get(function() { return `${this.first_name} ${this.last_name}` })

const EmployeesModel = mongoose.model("employee", employeesSchema)

module.exports = EmployeesModel
