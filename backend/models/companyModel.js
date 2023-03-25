const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
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
    name: { type: String, required: false },
    phoneNumber: {
      type: String,
      required: false,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    address: {
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    subscription: {
      type: String,
      enum: ['Standard', 'Business', 'Elite'],
      default: 'Standard',
      required: true,
    },
    staff: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
      required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Company', companySchema)
