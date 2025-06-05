const { DataTypes} = require('sequelize');

const createUserLoginModal = async (sequelize) => {
  
    const LoginUser = sequelize.define('LoginUser', {
        uId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{isEmail:true}
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
     refreshtoken:{
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
     },
    });
  
    return LoginUser;
  };
  
  module.exports = {
    createUserLoginModal,
  };

