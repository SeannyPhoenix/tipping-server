const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  screenName: String,
  active: {
    type: Boolean,
    default: true,
  },
  new: {
    type: Boolean,
    default: true,
  },
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
