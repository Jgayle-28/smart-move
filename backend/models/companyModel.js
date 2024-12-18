const mongoose = require('mongoose')

const companySchema = mongoose.Schema(
  {
    // Company Info
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
    },
    companyWebsite: { type: String, default: '', required: false },
    companyEstimatePolicy: { type: String, default: '', required: false },
    // Billing
    isCurrent: { type: Boolean, default: null },
    subscription: {
      type: String,
      enum: ['Standard', 'Business', 'Elite'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Not sure if these are being used
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
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Company', companySchema)
