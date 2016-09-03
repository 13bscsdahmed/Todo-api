var bcrypt= require('bcrypt');
var _= require('underscore');


module.exports= function(sequelize,DataTypes){
	return sequelize.define('user',{
	email:{
		type: DataTypes.STRING,
		allowNull:false,
		unique: true,		//allows unique emails,. no 2 same emails
		validate:{
			isEmail:true
		}
	},

	salt:{
		type: DataTypes.STRING      	//adding random set of char at end of text passwords so no two same pass hashed to same hash

	},
	password_hash:{
		type: DataTypes.STRING
	},

	password:{
		type: DataTypes.VIRTUAL,	//does not get stored in DB but is accessible
		allowNull:false,
		validate: {
			len: [7,100]
			},
			set: function(value){
				var salt= bcrypt.genSaltSync(10);
				var hashedPassword= bcrypt.hashSync(value,salt);

				this.setDataValue('password',value);
				this.setDataValue('salt',salt);
				this.setDataValue('password_hash',hashedPassword); 

			}
		}

	},
	{
		hooks:{
			beforeValidate: function(user,options){
				if(typeof user.email==='string'){
					user.email=user.email.toLowerCase();
				}

			}
		},
		instanceMethods:{

			toPublicJSON: function(){
				var json= this.toJSON();
				return _.pick(json,'id','email','createdAt','updatedAt');
			}
		}
	
	
	});

};