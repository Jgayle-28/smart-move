const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    companyEmail: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    companyPhoneNumber: {
      type: String,
      required: false,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    companyAddress: {
      type: String,
      required: false,
      // formattedAddress: String,
      // street: String,
      // city: String,
      // state: String,
      // zip: String,
    },
    companyWebsite: { type: String, default: '', required: false },
    companyEstimatePolicy: { type: String, default: '', required: false },
    billing: { type: Object },
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
    clients: {
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
