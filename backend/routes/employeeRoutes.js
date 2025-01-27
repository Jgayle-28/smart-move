const express = require('express')
const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getCurrentEmployee,
} = require('../controllers/employeeController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', createEmployee)
router.delete('/:id', protectRoute, deleteEmployee)
router.put('/:id', protectRoute, updateEmployee)
router.get('/current-employee/:id', protectRoute, getCurrentEmployee)
router.get('/current-employees/:id', getEmployees)

module.exports = router
