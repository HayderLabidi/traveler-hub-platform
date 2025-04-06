
const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Credit Card', 'Debit Card', 'PayPal']
  },
  last4: {
    type: String,
    required: true
  },
  expiry: {
    type: String
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;
