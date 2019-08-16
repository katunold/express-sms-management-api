'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "Provide a valid email." }
        }
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 15],
            msg: "Name should be between 5 and 15 characters"
          }
        }
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: {
          msg: "Phone number already exists"
        },
        validate: {
          notEmpty: true,
          len: {
            args: [10, 13],
            msg: "Name should be between 10 and 13 characters"
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          len: { args: [8], msg: "Password should be a minimum of 8 characters." }
        }
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contacts');
  }
};
