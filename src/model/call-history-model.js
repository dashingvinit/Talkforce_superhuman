const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callHistorySchema = new Schema({
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  fromNumber: { type: String, required: true },
  toNumber: { type: String, required: true },
  timestamp: { type: Date, required: true },
  duration: { type: Number, required: false },
  callType: {
    type: String,
    enum: ['incoming', 'outgoing', 'missed'],
    required: false,
  },
});

module.exports = mongoose.model('CallHistory', callHistorySchema);
