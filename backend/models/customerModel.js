const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please add a customer name'],
    },
    // customerLastName: {
    //   type: String,
    //   required: [true, 'Please add a customer name'],
    // },
    customerEmail: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid customer email',
      ],
    },
    customerPhoneNumber: {
      type: String,
      required: true,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    altCustomerPhoneNumber: {
      type: String,
      required: false,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    customerAddress: {
      type: Object,
      // required: [true, 'Please add a customer address'],
      // formattedAddress: String,
      // street: String,
      // city: String,
      // state: String,
      // zip: String,
    },
    referredBy: {
      type: String,
      required: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: String,
      default: '',
      required: false,
    },
    billing: { type: Object },
    jobs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Customer', customerSchema)
