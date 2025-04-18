const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['passenger', 'driver', 'admin'],
    default: 'passenger'
  },
  profilePhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  },
  // Driver specific fields
  driverInfo: {
    driverLicense: String,
    vehicleInfo: {
      model: String,
      year: String,
      licensePlate: String,
      carImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo'
      }
    },
    isAvailable: { type: Boolean, default: true },
    currentLocation: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    }
  },
  // Passenger specific fields
  passengerInfo: {
    paymentMethods: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod'
    }],
    savedLocations: [{
      name: String,
      coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
      }
    }]
  }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password verification method
userSchema.methods.verifyPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
