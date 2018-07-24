const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port  = process.env.PORT || 3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}:${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log',log + '\n',(err)=> {
		if(err)
		{
			console.log('Unable to apped File in server.log');
		}
	});
	next();
});


app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) =>{
	res.send({
		name:'Shubham',
		likes:[
		'Biking',
		'Citing'
		]
	});
});

app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req,res) => {
	res.send({
		errorMessage:'Unable to handle request'
	});
});

app.get('/Home',(req,res) =>{
	res.render('home.hbs',{
		homePage:'This is Home page'
	});
});
app.use((req,res,next) => {
	res.render('maintenance.hbs');
	//Comment for maintenance
	next();
});

app.listen(port,() =>{
	console.log(`Server is listening in the port ${port}`);
});