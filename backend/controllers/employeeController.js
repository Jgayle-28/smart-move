const asyncHandler = require('express-async-handler')
const { userHasPermissions } = require('../utils/auth')

const Employee = require('../models/employeeModel')

// @desc create a new employee
// @route POST /api/employees
// @access public
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      status,
      comments,
      daysAvailable,
      company,
    } = req.body

    // Validate required fields
    if (!name || !email || !phoneNumber || !status || !company) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Ensure daysAvailable contains only valid days
    const validDays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
    if (
      daysAvailable &&
      (!Array.isArray(daysAvailable) ||
        daysAvailable.some((day) => !validDays.includes(day)))
    ) {
      return res.status(400).json({
        message: 'Invalid daysAvailable. Must contain valid days of the week.',
      })
    }

    // Create the employee
    const newEmployee = new Employee({
      name,
      email,
      phoneNumber,
      address,
      status,
      comments: comments || '',
      daysAvailable: daysAvailable || [],
      company,
    })

    // Save the employee to the database
    const savedEmployee = await newEmployee.save()

    res.status(201).json(savedEmployee)
  } catch (error) {
    console.error('Error creating employee:', error)
    res.status(500).json({
      message: 'An error occurred while creating the employee',
      error: error.message,
    })
  }
})

// @desc update an employee
// @route PUT /api/employees
// @access public
const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params // Extract the employee ID from the route parameters
    const updateData = req.body // Data to update

    // Validate daysAvailable if it's in the request body
    if (updateData.daysAvailable) {
      const validDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
      if (
        !Array.isArray(updateData.daysAvailable) ||
        updateData.daysAvailable.some((day) => !validDays.includes(day))
      ) {
        return res.status(400).json({
          message:
            'Invalid daysAvailable. Must contain valid days of the week.',
        })
      }
    }

    // Find the employee by ID and update
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators are applied
    })

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    res.status(200).json(updatedEmployee)
  } catch (error) {
    console.error('Error updating employee:', error)
    res.status(500).json({
      message: 'An error occurred while updating the employee',
      error: error.message,
    })
  }
})

// @desc employees by company id
// @route GET /api/jobs/:id
// @access private
const getEmployees = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Validate company ID
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400)
    throw new Error('Invalid company ID')
  }

  // Fetch employees
  const employees = await Employee.find({ company: id })
    .sort({ createdAt: -1 })
    .populate('jobs')

  res.status(200).json(employees)
})

module.exports = {
  getEmployees,
}

// @desc delete  a user
// @route DELETE /api/users
// @access private
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!employee) {
    res.status(404)
    throw new Error('Employee not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error(
      'You do not have the correct credentials to delete employee.'
    )
  }
  // delete the user
  await employee.deleteOne()

  res.status(200).json({
    success: true,
    message: 'employee deleted',
    employeeId: req.params.id,
  })
})
// @desc current employee
// @route GET /api/users/current-user
// @access private
const getCurrentEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ _id: req.params.id }).populate(
    'jobs'
  )

  if (employee) {
    res.status(200).json(employee)
  } else {
    res.status(401)
    throw new Error('Employee not found...')
  }
})

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getCurrentEmployee,
}
