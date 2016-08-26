module.exports= function(sequelize,DataTypes){
	return sequelize.define('todo',{
	description:{
		type: DataTypes.STRING,
		allowNull:false,
		validate:{
			len:[1,250]	//prevent empty strings to be added

		}
	},
	completed:{
		type: DataTypes.BOOLEAN,
		allowNull:false,
		defaultValue:false

	}
});

};