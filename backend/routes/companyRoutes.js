const express = require('express')
const {
  registerCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  getCompanyTeam,
} = require('../controllers/companyController')

const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerCompany)
router.get('/:id', protectRoute, getCompany)
router.put('/:id', protectRoute, updateCompany)
router.delete('/:id', protectRoute, deleteCompany)
router.get('/team-members/:id', protectRoute, getCompanyTeam)

module.exports = router
