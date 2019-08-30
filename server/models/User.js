export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "Provide a valid email." }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: {
        msg: "Phone number already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [8], msg: "Password should be a minimum of 8 characters." }
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: 'senderId'
    });
    User.hasMany(models.Message, {
      foreignKey: 'receiverId'
    })
  };

  return User
};
