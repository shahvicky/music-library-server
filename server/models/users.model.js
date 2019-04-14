'use strict';

const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');
const {to, TE, ReE, ReS} = require('./../../global_functions');

module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('users', {
    usrUserId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,      
      autoIncrement: true,
      field: 'usr_user_id'
    },
    usrFname: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'usr_fname'
    },
    usrLname: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'usr_lname'
    },
    usrEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      unique: true,
      validate : {
        isEmail : true
      },
      field: 'usr_email'
    },
    usrPassHash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
      field: 'usr_pass_hash'
    },
    usrPassResetToken: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
      field: 'usr_pass_reset_token'
    },
    usrPassResetExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: 'usr_pass_reset_expiry'
    },
    usrRegisterToken: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
      field: 'usr_register_token'
    },
    usrPassExpiry: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00',
      field: 'usr_pass_expiry'
    },
    usrPassAttempts: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'usr_pass_attempts'
    },
    usrRowActiveFlag: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'usr_row_active_flag'
    },
  }, {
    timestamps: true,
    tableName: 'users'
  });

  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed('usrPassHash')){
        let salt, hash
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(user.usrPassHash, salt));
        if(err) TE(err.message, true);

        user.usrPassHash = hash;
    }
});

  Model.prototype.comparePassword = async function (pw) {
    let err, pass;
    if(!this.usrPassHash) TE('password not set');
    [err, pass] = await to(bcrypt_p.compare(pw, this.usrPassHash));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return this;
  }

  Model.prototype.getJWT = function () {
    let expirationTime = parseInt(config.jwtExpire);
    return "Bearer " + jwt.sign({user_id : this.usrUserId}, config.jwtSecret, {expiresIn: expirationTime});
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
