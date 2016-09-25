var Sequelize= require('sequelize');
var sequelize= new Sequelize(undefined, undefined,undefined,{
	'dialect': 'sqlite',
	'storage': __dirname+ '/basic-sqlite-database.sqlite'
});

var Todo= sequelize.define('todo',{
	description:{
		type: Sequelize.STRING,
		allowNull:false,
		validate:{
			len:[1,250]	//prevent empty strings to be added

		}
	},
	completed:{
		type: Sequelize.BOOLEAN,
		allowNull:false,
		defaultValue:false

	}
});

var User= sequelize.define('user',{
	email: Sequelize.STRING
	
});

Todo.belongsTo(User);
User.hasMany(Todo);
sequelize.sync({
	//force:true
	}).then(function(){
	console.log('Everything is synced');
	Todo.findById(2).then(function(todo){
		if(todo){
		console.log(todo.toJSON());
		}
		else{
			console.log('No todo found');
		}

	});

	User.findById(1).then(function(user){
		user.getTodos({				//takes model name capitalized and put get before and s after it to work
			where: {
				completed:false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			});
		});
	});

// 	Todo.create({
// 		 description:'Walking my dog',
// 		 //completed: false
// 	}).then(function (todo){
// 		return Todo.create({
// 			description: 'Clean office'
// 		});
		
// 	}).then(function(){
// 		//return Todo.findById(1)
// 		return Todo.findAll({
// 			where:{
// 				//completed: false
// 				description:{
// 					$like:'%office%'
// 				}
// 			}
// 		});
// 	}).then(function(todos){
// 		if(todos){
// 			todos.forEach(function(todo){
// 				console.log(todo.toJSON());
// 			});
			
// 		}
// 		else{
// 			console.log('No Object found');
// 		}
// 	})
// 	.catch(function(e){
// 		console.log(e);

// 		});


	// User.create({
	// 	email:'13bscsdahmed@seecs.edu.pk'
	// 	}).then(function(){
	// 		return Todo.create({
	// 			description:'Clean yard'
	// 		});

	// 	}).then(function(todo){
	// 		User.findById(1).then(function(user){
	// 			user.addTodo(todo);
	// 		});
	// 	});
	
 

 });