const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }],
  role: {
    type: String,
    enum: ['admin', 'driver', 'passenger'],
    default: 'passenger'
  },
  // Driver specific fields
  driverLicense: {
    type: String,
    required: function() {
      return this.role === 'driver';
    }
  },
  vehicleInfo: {
    type: {
      type: String,
      required: function() {
        return this.role === 'driver';
      }
    },
    model: {
      type: String,
      required: function() {
        return this.role === 'driver';
      }
    },
    year: {
      type: String,
      required: function() {
        return this.role === 'driver';
      }
    },
    color: {
      type: String,
      required: function() {
        return this.role === 'driver';
      }
    },
    licensePlate: {
      type: String,
      required: function() {
        return this.role === 'driver';
      }
    },
    seatsAvailable: {
      type: Number,
      required: function() {
        return this.role === 'driver';
      }
    },
    carImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      required: function() {
        return this.role === 'driver';
      }
    }
  },
  paymentMethods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
