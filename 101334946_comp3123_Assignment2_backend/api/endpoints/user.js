
"use strict"

const UserEndpoints = {
	signUp: {
		path: "/signup",
		successResCode: 201,
		failureResCode: 400
	},
	login: {
		path: "/login",
		successResCode: 200,
		failureResCode: 401
	}
}

module.exports = UserEndpoints
