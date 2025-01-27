const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')
const path = require('path')

const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000

// Connect to Db
connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get(`/`, (req, res) => res.send(`Hola`))
// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/companies', require('./routes/companyRoutes'))
app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/employees', require('./routes/employeeRoutes'))
app.use('/api/estimates', require('./routes/estimateRoutes'))
app.use('/api/inventory', require('./routes/inventoryRoutes'))
app.use('/api/payments', require('./routes/paymentRoutes'))

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // Any route that is not API will serve the React app
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
