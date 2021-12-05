let mongoose = require('mongoose');

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const EmployeeScheme = new mongoose.Schema({
	_id: {
		type: Number,
		required: [ true, 'Please enter an ID! Cannot be empty' ]
	},
	firstName: {
		type: String,
		required: [ true, 'Please enter a first name! Cannot be empty' ],
		trim: true
	},
	lastName: {
		type: String,
		required: [ true, 'Please enter a last name! Cannot be empty' ],
		trim: true
	},
	emailId: {
		type: String,
		required: [ true, 'Please enter an email! Cannot be empty' ],
		validate: [ validateEmail, 'Please provide the proper email format: (username@domain.com)' ],
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill in a valid email address' ],
		unique: true,
		trim: true,
		lowercase: true
	}
});

const Employee = mongoose.model('employee', EmployeeScheme);
module.exports = Employee;
