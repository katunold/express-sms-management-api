'use strict';
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 15],
          msg: "Name should be between 5 and 15 characters"
        }
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
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
    }
  }, {});

  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId'
    });
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId'
    })
  };

  return Contact
};
