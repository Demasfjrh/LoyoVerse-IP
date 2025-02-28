'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite, {foreignKey: 'UserId'});
    }
  }
  User.init({
    UserName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email must be unique"
      },
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: "Email is required"
        },
        notNull: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100]
      }
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
    user.imgUrl = 'https://th.bing.com/th?q=Meme+Jomok&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-ID&cc=ID&setlang=id&adlt=strict&t=1&mw=247' 
  })
  return User;
};