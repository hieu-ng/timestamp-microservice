// Dependences

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Bypass Access-Control-Allow-Origin Problem
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// Get function
app.get('/date/:date_values', function(req, res, next) {
	let natural_date, unix_date;
	const date_value = req.params.date_values,
		ddmmyy = (str) => { let split = str.split('/'); return `${split[1]}-${split[0]}-${split[2]}`; }

	if (isNaN(date_value)) {
		natural_date = new Date(date_value).toLocaleDateString('en-us');
		unix_date = new Date(date_value).getTime() / 1000;
	} else {
		unix_date = date_value;
		natural_date = new Date(date_value * 1000).toLocaleDateString('en-us');
	}

	res.json({
		unix_format: unix_date,
		readable_format: ddmmyy(natural_date)
	});
})

// Set port
const port = process.env.PORT || 3000;

// Listing app
app.listen(port, function() {
	console.log(`App is listing on PORT ${port}`);
})

// Export app as module
module.exports = app;
