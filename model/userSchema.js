const { DataTypes} = require('sequelize');

const createUserModal = async (sequelize) => {
  
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      desiganation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empId: {
        type: DataTypes.STRING,
        allowNull: false, 
      }
    });
  
    return User;
  };
  
  module.exports = {
    createUserModal,
  };

