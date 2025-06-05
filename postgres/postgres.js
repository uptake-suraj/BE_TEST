const { Sequelize } = require('sequelize');
const { createUserModal } = require('../model/userSchema');
const { createUserLoginModal } = require('../model/userModal');

const sequelize = new Sequelize('postgres', 'postgres', 'newpassword', {
  host: 'localhost',
  dialect: 'postgres',
});

let UserModal = null;
let UserLoginModal = null

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    const UserLoginModal = await  createUserLoginModal(sequelize)
    UserModal = await createUserModal(sequelize);
    await UserLoginModal.sync({alter:true});
    await sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

const getUserModal = () => {
  if (!UserModal) {
    throw new Error('UserModal not initialized. Call connection() first.');
  }
  return UserModal;
};

module.exports = {
  connection,
  getUserModal,
  UserLoginModal
};
