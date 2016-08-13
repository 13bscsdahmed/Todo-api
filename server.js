var express=require('express');
var app=express();
var PORT= process.env.port|| 3000;


var todos=[{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
},
{
	id:2,
	description: 'Go to market',
	completed: false

},
{
	id:3,
	description: 'Play Tennis',
	completed: true
}];


app.get('/',function(req,res){
	res.send('TODO API Root');
});

app.get('/todos',function(req,res){
	res.json(todos);
});

app.get('/todos/:id', function(req,res){
	var todoID= parseInt(req.params.id,10);
	var matchdedtodo;
	//res.send('Asking for todo with id of:'+req.params.id);
	//res.send(todos.length);
	todos.forEach(function(todo){
		if(todoID === todo.id) {


			matchdedtodo= todo;

		}
			
	});

	if(matchdedtodo){

		res.json(matchdedtodo);

	}
	else{
		res.status(404).send();
	}
	

});
		



app.listen(PORT,function(){
	console.log('Express listening on PORT'+ PORT+'!');
});