const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: { type: String, require: [true, 'Please add a password'] },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'user'],
      default: 'user',
      required: [true, 'Please add a role'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Office',
      required: false, // TODO -> Need to make required
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
