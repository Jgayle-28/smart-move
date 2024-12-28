const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Item Details
    itemName: { type: String, required: true, default: '' },
    itemWeight: { type: String, required: true, default: '' },
    itemVolume: { type: String, required: true, default: '' },
    itemRoom: { type: String, required: false, default: '' },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Inventory', inventorySchema)
3
