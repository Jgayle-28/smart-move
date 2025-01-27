import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import companyReducer from './company/companySlice'
import customerReducer from './customers/customerSlice'
import jobReducer from './jobs/jobSlice'
import employeeReducer from './employees/employeeSlice'
import estimateReducer from './estimates/estimateSlice'
import inventoryReducer from './inventory/inventorySlice'
import paymentReducer from './payments/paymentSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  customers: customerReducer,
  jobs: jobReducer,
  employees: employeeReducer,
  estimates: estimateReducer,
  inventory: inventoryReducer,
  payments: paymentReducer,
})
