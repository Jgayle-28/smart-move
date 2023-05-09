const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    estimate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estimate',
      required: false,
    },
    // Job Details
    jobTitle: { type: String, required: true, default: '' },
    jobType: {
      type: String,
      required: true,
      default: '',
    },
    jobDate: { type: Date, required: false, default: null },
    jobStartTime: { type: Date, required: false, default: null },
    pickUpAddress: { type: String, required: false, default: '' },
    pickUpAddress2: { type: String, required: false, default: '' },
    dropOffAddress: { type: String, required: false, default: '' },
    dropOffAddress2: { type: String, required: false, default: '' },
    dropOffItems: { type: Array, required: false, default: [] },
    jobComments: { type: String, required: false, default: '' },
    paymentType: { type: String, default: '' },
    billTo: {
      type: String,
      default: '',
    },
    isPaid: { type: Boolean, default: false },
    billingSameAsCustomer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)
