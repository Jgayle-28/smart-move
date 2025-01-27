const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please add a name'] },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
      default: '',
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: [20, 'Phone number can not be longer than 20 characters'],
      default: '',
    },
    address: {
      type: String,
      required: false,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Not Active', 'No Go'],
      default: 'active',
      required: [true, 'Please add a status'],
    },
    comments: {
      type: String,
      default: '',
      required: false,
    },
    daysAvailable: {
      type: [String],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      validate: {
        validator: function (v) {
          // Ensure no duplicate days
          return Array.isArray(v) && new Set(v).size === v.length
        },
        message: 'Days available must be unique.',
      },
      required: false,
    },
    jobs: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
      default: [],
      required: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Office',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Employee', employeeSchema)
