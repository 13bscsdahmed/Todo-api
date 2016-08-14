var express=require('express');
var app=express();
var PORT= process.env.PORT || 3000;
var bodyParser= require('body-parser');
var _= require('underscore');

var todos=[];
var todoNextId= 1;

app.use(bodyParser.json());
app.get('/',function(req,res){
	res.send('TODO API Root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});

app.get('/todos/:id', function(req,res){
	var todoID= parseInt(req.params.id,10);
	var matchdedtodo= _.findWhere(todos,{id: todoID}); //underscore library
	//var matchdedtodo;
	//res.send('Asking for todo with id of:'+req.params.id);
	//res.send(todos.length);
	// todos.forEach(function(todo){
	// 	if(todoID === todo.id) {


	// 		matchdedtodo= todo;

	// 	}
			
	// });

	if(matchdedtodo){

		res.json(matchdedtodo);

	}
	else{
		res.status(404).send();
	}
	

});
		


app.post('/todos', function (req,res){
	var body= _.pick(req.body,'description','completed');


	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){


		return res.status(400).send();
	}


	body.description=body.description.trim();
	body.id=todoNextId;
	todoNextId+=1
	//console.log('description:'+body.description);
	todos.push(body);
	res.json(body);

});


app.listen(PORT,function(){
	console.log('Express listening on PORT'+ PORT+'!');
});