export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    textMessage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 140],
          msg: "Message content must be between 5 to 140 characters"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    });
  };

  return Message
};
