const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  leadSource: { type: String, required: false },
  stage: { type: String, default: 'new' },
  notes: { type: String, required: false },
  callHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CallHistory' }],
});

module.exports = mongoose.model('Contact', contactSchema);
