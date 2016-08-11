var express= require('express');
var app= express();
var PORT= process.env.PORT || 3000;   // process.env.PORT is environment variable provided by heroku. If app runs on heroku, it uses this variable for port number, otherwise uses the other port

app.get('/', function(req,res){
	res.send('Todo API Root')
});

app.listen(PORT, function(){
	console.log('Express listening on port'+PORT+'!');
});