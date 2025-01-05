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
    // Estimate Details
    estimateDate: { type: mongoose.Mixed },
    estimateTime: { type: mongoose.Mixed },
    estimateComments: { type: String },
    // Job Details
    jobTitle: { type: String, required: true, default: '' },
    jobType: {
      type: String,
      required: true,
      default: '',
    },
    // Date & Time Details
    jobDate: { type: Date, required: false, default: null },
    jobStartTime: { type: Date, required: false, default: null },
    // Address Details
    pickUpAddress: { type: Object, required: false, default: null },
    pickUpAddress2: { type: Object, required: false, default: null },
    pickUpAddress3: { type: Object, required: false, default: null },
    dropOffAddress: { type: Object, required: false, default: null },
    dropOffAddress2: { type: Object, required: false, default: null },
    dropOffAddress3: { type: Object, required: false, default: null },
    dropOffItems: { type: Array, required: false, default: [] },
    jobComments: { type: String, required: false, default: '' },
    // Billing Details
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
