const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    address: { type: String }, // no `required: true`
    details: { type: String, default: '' },
  },
  { _id: false }
)

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
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    estimate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estimate',
      required: false,
    },
    estimateDate: { type: mongoose.Mixed },
    estimateTime: { type: mongoose.Mixed },
    estimateComments: { type: String },
    jobTitle: { type: String, required: true, default: '' },
    jobType: { type: String, required: true, default: '' },
    jobDate: { type: Date, required: false, default: null },
    jobStartTime: { type: Date, required: false, default: null },
    pickUpAddresses: {
      type: [addressSchema],
      default: [],
    },

    dropOffAddresses: {
      type: [addressSchema],
      default: [],
    },
    dropOffItems: { type: Array, required: false, default: [] },
    jobComments: { type: String, required: false, default: '' },
    paymentType: { type: String, default: '' },
    billTo: { type: String, default: '' },
    isPaid: { type: Boolean, default: false },
    billingSameAsCustomer: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)
