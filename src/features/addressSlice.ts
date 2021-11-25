import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

const initialState = {
  prefecture: '',
  city: '',
  town: '',
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,

  reducers: {
    setPrefecture: (state, action) => {
      state.prefecture = action.payload
    },
    setCity: (state, action) => {
      state.city = action.payload
    },
    setTown: (state, action) => {
      state.town = action.payload
    },
  },
})

export const { setPrefecture, setCity, setTown } = addressSlice.actions
export const selectPrefecture = (state: RootState) => state.address.prefecture
export const selectCity = (state: RootState) => state.address.city
export const selectTown = (state: RootState) => state.address.town

export default addressSlice.reducer
