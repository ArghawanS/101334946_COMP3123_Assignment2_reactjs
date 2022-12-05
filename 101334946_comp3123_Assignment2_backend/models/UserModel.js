const mongoose = require('mongoose')
const projectSchema = require("../constants/ProjectSchema")
const RegEx = require("../constants/RegEx")

const usersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		maxLength: 100
	},
	email: {
		type: String,
		unique: true,
		maxLength: 50,
		validate(value) {
			return !/RegEx.forValidEmail/.test(value)
		}
	},
	password: {
		type: String,
		required: true,
		maxLength: 50,
		validate: {
			validator: function(v) {
				return !/RegEx.forStrongPassword/.test(v);
			},
			message: props => `${props.value} is not a strong password!`
		}
	}
}, { collection: projectSchema.usersCollection})


const UserModel = mongoose.model("user", usersSchema)

module.exports = UserModel
