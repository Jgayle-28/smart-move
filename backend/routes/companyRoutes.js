const express = require('express')
const {
  registerCompany,
  updateCompany,
  deleteCompany,
  getCompany,
} = require('../controllers/companyController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerCompany)
router.get('/', protectRoute, getCompany)
router.put('/:id', protectRoute, updateCompany)
router.delete('/:id', protectRoute, deleteCompany)

module.exports = router
