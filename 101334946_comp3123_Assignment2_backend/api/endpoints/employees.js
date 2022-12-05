
"use strict"

const EmployeeEndpoints = {

	getAll: {
		path: "/",
		successResCode: 200
	},
	createNew: {
		path: "/",
		successResCode: 201,
		failureResCode: 400
	},
	getById: {
		path: "/:eid",
		successResCode: 200,
		failureResCode: 404
	},
	updateById: {
		path: "/:eid",
		successResCode: 200,
		badRequestResCode: 400, // for example: when request body is empty
		failureResCode: 404
	},
	deleteById: {
		path: "/:eid",
		successResCode: 204,
		badRequestResCode: 400, // for example: when request body is empty
		failureResCode: 400
	}
}

module.exports = EmployeeEndpoints