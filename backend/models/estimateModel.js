const mongoose = require('mongoose')

const estimateSchema = mongoose.Schema(
  {
    // Models to tie to
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
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
    // delivery & Pick up & Drop off details
    deliveryItems: {
      type: Array,
      default: [],
    },
    // Move details
    inventory: {
      type: Array,
      default: [],
    },
    // Service Details
    packing: {
      packDate: {
        type: Date,
      },
      packTime: {
        type: Date,
      },
      packingItems: [
        {
          packingItem: {
            type: String,
          },
          packingItemAmt: {
            type: Number,
          },
          packingItemQty: {
            type: Number,
          },
          packingItemRate: {
            type: Number,
          },
        },
      ],
      packingTotal: { type: Number },
    },
    fees: {
      receivingFee: { type: Number },
      totalFees: { type: Number },
    },
    additionalServices: {
      addservices: [],
      addServicesTotal: { type: Number },
    },
    storage: {
      storageItems: [],
      storageTotal: { type: Number },
    },
    // Totals
    totalWeight: { type: Number },
    totalVolume: { type: Number },
    totalItemCount: { type: Number },
    allTotal: { type: Number },
    // final costs
    moveCost: {
      totalMen: { type: Number },
      totalTrucks: { type: Number },
      totalHours: { type: Number },
      moveHours: { type: Number },
      stairHours: { type: Number },
      longCarryHours: { type: Number },
      driveTime: { type: Number },
      adjustmentTime: { type: Number },
      ratePerHour: { type: Number },
      tripFee: { type: Number },
      totalMoveCost: { type: Number },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Estimate', estimateSchema)
