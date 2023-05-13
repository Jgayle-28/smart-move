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
    moveCharges: {
      totalMen: { type: mongoose.Mixed },
      totalTrucks: { type: mongoose.Mixed },
      ratePerHour: { type: mongoose.Mixed },
      driveTime: { type: mongoose.Mixed },
      stairHours: { type: mongoose.Mixed },
      totalHours: { type: mongoose.Mixed },
      longCarryHours: { type: mongoose.Mixed },
      adjustmentTime: { type: mongoose.Mixed },
      moveHours: { type: mongoose.Mixed },
      totalMoveHours: { type: mongoose.Mixed },
      totalMoveCost: { type: mongoose.Mixed },
    },
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
          packingItemQty: {
            type: Number,
          },
          packingItemRate: {
            type: Number,
          },
          packingItemAmt: {
            type: Number,
          },
        },
      ],
      packingTotal: { type: Number },
    },
    fees: {
      tripFee: { type: Number },
      receivingFee: { type: Number },
      additionalFees: [],
      totalFees: { type: Number },
    },
    additionalServices: {
      services: [],
      additionalServicesTotal: { type: Number },
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
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Estimate', estimateSchema)
