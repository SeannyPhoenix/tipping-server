const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const EventSchema = new Schema({
  // Event Name
  name: {
    type: String,
    required: true,
  },

  // Host Organization
  organization: {
    type: ObjectID,
    ref: 'Organization',
  },

  // Host List
  hosts: [{
    // Host Account
    account: {
      type: ObjectID,
      ref: 'Account',
      required: true,
    },
  }],

  // Performer List
  performers:
  {
    // Performer Account
    account: {
      type: ObjectID,
      ref: 'Account',
    },
  },

  // Active
  active: {
    type: Boolean,
    default: true,
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;