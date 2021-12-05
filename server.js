let express = require('express');
let mongoose = require('mongoose');
let EmployeeRouter = require('./routes/EmployeeRoutes.js');

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

app.use(EmployeeRouter);

app.listen(9090, () => {
	console.log('Server running at port 9090');
});
