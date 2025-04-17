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
  role: {
    type: String,
    enum: ['driver', 'passenger'],
    default: 'passenger'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  // Driver specific fields (only used when role is 'driver')
  driverInfo: {
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
    rating: {
      type: Number,
      default: 0
    },
    totalRides: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    currentLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  // Passenger specific fields (only used when role is 'passenger')
  passengerInfo: {
    paymentMethods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod'
    }],
    rating: {
      type: Number,
      default: 0
    },
    totalRides: {
      type: Number,
      default: 0
    },
    favoriteDrivers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    savedLocations: [{
      name: String,
      address: String,
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    }]
  }
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

// Method to switch role
userSchema.methods.switchRole = async function(newRole) {
  if (!['driver', 'passenger'].includes(newRole)) {
    throw new Error('Invalid role');
  }
  
  this.role = newRole;
  return this.save();
};

// Create 2dsphere index for geospatial queries
userSchema.index({ 'driverInfo.currentLocation': '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
