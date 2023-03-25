const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected to MongoDB: ${conn.connection.host}`.bgBrightGreen)
  } catch (error) {
    console.log(`Error: ${error.message}`.bgBrightMagenta)
    process.exit(1)
  }
}
module.exports = connectDb
