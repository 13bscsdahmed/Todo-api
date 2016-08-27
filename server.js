var express=require('express');
var app=express();
var PORT= process.env.PORT || 3000;
var bodyParser= require('body-parser');
var _= require('underscore');
var db=require('./db.js');

var todos=[];
var todoNextId= 1;

app.use(bodyParser.json());
app.get('/',function(req,res){
	res.send('TODO API Root');
});

app.get('/todos',function(req,res){
	
	var query= req.query;	//query parameters

	var where={};
	if(query.hasOwnProperty('completed') && query.completed=== 'true'){
		where.completed=true;
	}
	else if(query.hasOwnProperty('completed') && query.completed=== 'false'){
		where.completed=false;
	}

	if (query.hasOwnProperty('q') &&  query.q.length>0){
		where.description={
			$like:'%'+query.q+'%'
		};


	}

	db.todo.findAll({where:where}).then(function(todos){

		res.json(todos);

	}, function(e){
		res.status(500).send();

	});



	// 	filteredTodos=_.where(filteredTodos,{completed:true});
	// }
	// else if(queryParams.hasOwnProperty('completed') && queryParams.completed=== 'false'){


	});



	// var filteredTodos= todos;
	
	// if(queryParams.hasOwnProperty('completed') && queryParams.completed=== 'true'){

	// 	filteredTodos=_.where(filteredTodos,{completed:true});
	// }
	// else if(queryParams.hasOwnProperty('completed') && queryParams.completed=== 'false'){

	// 	filteredTodos=_.where(filteredTodos,{completed:false});
	// }

	// if (queryParams.hasOwnProperty('q') &&  queryParams.q.length>0){

	// 	filteredTodos= _.filter(filteredTodos, function callback(todo){
	// 		if(todo.description.indexOf(queryParams.q)>=0){
	// 			return todo;

	// 		}
	// 	});
	// }

	// res.json(filteredTodos);


app.get('/todos/:id', function(req,res){
	var todoID= parseInt(req.params.id,10);



	db.todo.findById(todoID).then(function(todo){
		if(!!todo){
		res.json(todo.toJSON());
		}
		else{
			res.status(404).send();
		}
		
	},function(e){
		return res.status(500).json(e);


	});

	//var matchdedtodo= _.findWhere(todos,{id: todoID}); //underscore library
	//var matchdedtodo;
	//res.send('Asking for todo with id of:'+req.params.id);
	//res.send(todos.length);
	// todos.forEach(function(todo){
	// 	if(todoID === todo.id) {


	// 		matchdedtodo= todo;

	// 	}
			
	// });

	// if(matchdedtodo){

	// 	res.json(matchdedtodo);

	// }
	// else{
	// 	res.status(404).send();
	// }
	

});
		


app.post('/todos', function (req,res){
	var body= _.pick(req.body,'description','completed');
	db.todo.create(body).then(function(todo){
		 res.json(todo.toJSON());
		}, function (e){
			
			return res.status(400).json(e);
	});	
 		
 			
 		

	// if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){


	// 	return res.status(400).send();
	// }


	// body.description=body.description.trim();
	// body.id=todoNextId;
	// todoNextId+=1
	// //console.log('description:'+body.description);
	// todos.push(body);
	// res.json(body);

});


app.delete('/todos/:id', function(req,res){
	var todoID= parseInt(req.params.id,10);
	var matchedtodo= _.findWhere(todos,{id: todoID});
	if(!matchedtodo){
		return res.status(404).json({"Error":"No Todo found with that id"});
	}

	else{
	todos=_.without(todos,matchedtodo);
	
	res.json(todos);

	}





});



app.put('/todos/:id', function(req,res){
	var body= _.pick(req.body,'description','completed');
	var validAttributes={};
	var todoID= parseInt(req.params.id,10);
	var matchedtodo= _.findWhere(todos,{id: todoID});
	console.log(typeof(body.completed));
	if(!matchedtodo){
		return res.status(404).send(); // return statement if executed will not let any code after it execute. it ends there
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){  //run if body has completed property and is boolean
		validAttributes.completed= body.completed;
		
	}
	else if(body.hasOwnProperty('completed')){		//run if body has completed but is not boolean
		return res.status(400).send(); 
	}

	if(body.hasOwnProperty('description')&& _.isString(body.description) && body.description.trim().length>0) {
		validAttributes.description=body.description;
		

	}
	else if(body.hasOwnProperty('description')){
		
		return res.status(400).send();

	}

	//if code executes till this point we know that there's something right provided to be updated

	_.extend(matchedtodo,validAttributes);
	res.json(matchedtodo);

});

db.sequelize.sync().then(function(){
	app.listen(PORT,function(){
	console.log('Express listening on PORT'+ PORT+'!');
	});

});

