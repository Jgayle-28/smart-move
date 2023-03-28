import { combineReducers } from '@reduxjs/toolkit'
import { reducer as calendarReducer } from 'src/slices/calendar'
import { reducer as chatReducer } from 'src/slices/chat'
import { reducer as kanbanReducer } from 'src/slices/kanban'
import { reducer as mailReducer } from 'src/slices/mail'
// NEW
import authReducer from './auth/authSlice'
import companyReducer from './company/companySlice'
import clientsReducer from './clients/clientsSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  clients: clientsReducer,
  // OLD
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
})
