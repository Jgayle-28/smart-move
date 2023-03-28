import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  clients: null,
  createdClient: null,
  isLoading: false,
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default clientsSlice.reducer
