let express = require('express');
let mongoose = require('mongoose');
let EmployeeModel = require('./models/employee');

const app = express();

// middleware
app.use(express.json());

mongoose.connect(
	'mongodb+srv://TheRiftGuardian:S6fdxxikdhRL29K@comp3123.okoru.mongodb.net/101289239_assignment2?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.get('/', (req, res) => {
	res.send('<h1>Employees Database</h1>');
});

// Insert New Employee
app.post('/api/v1/employees', async (req, res) => {
	const new_employee = EmployeeModel(req.body);
	try {
		await new_employee.save();
		res.send(new_employee);
		res.status(200).send('A new Employee resource is created.');
	} catch (err) {
		res.status(500).send(err);
	}
});

// Get Employees
app.get('/api/v1/employees', async (req, res) => {
	const employees = await EmployeeModel.find({});
	try {
		res.send(employees);
		res.status(200).send('All Employee resources are fetched.');
	} catch (err) {
		res.status(500).send(err);
	}
});

// Fetch Employee By ID
app.get('/api/v1/employees/:id', async (req, res) => {
	const fetched_employee = await EmployeeModel.findById(req.params.id);

	try {
		res.send(fetched_employee);
		res.status(200).send('One Employee resource is fetched.');
	} catch (err) {
		res.status(500).send(err);
	}
});

// Update Employee By ID
app.put('/api/v1/employees/:id', async (req, res) => {
	try {
		// Hey Sir, I had to set them as variables because leaving then without them resulted in error code 500, I'm not sure why since they both
		// had await but setting them to variables apparently worked.
		employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body);
		updated_employee = await employee.save();
		res.send(updated_employee);
		res.status(200).send('Employee resource is updated.');
	} catch (err) {
		res.status(500).send(err);
		console.log(err);
	}
});

// Delete Employee By ID
app.delete('/api/v1/employees/:id', async (req, res) => {
	try {
		const deleted_employee = await EmployeeModel.findByIdAndDelete(req.params.id);

		if (res.status(204)) res.status.send('Employee resource is deleted.');
	} catch (err) {
		res.status(500).send(err);
	}
});

app.listen(9090, () => {
	console.log('Server running at port 9090');
});

module.exports = app;
