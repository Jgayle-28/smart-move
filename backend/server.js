const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')

const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000

// Connect to Db
connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get(`/`, (req, res) => res.send(`Hola`))
// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/companies', require('./routes/companyRoutes'))
app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))
app.use('/api/estimates', require('./routes/estimateRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
