
import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
	name: 'auth',
	initialState: {
		idInstance: '',
		apiTokenInstance: ''
	},
	reducers: {
		updateId: (state, action) => {
			state.idInstance = action.payload
		},
		updateToken: (state, action) => {
			state.apiTokenInstance = action.payload
		},

	}
})

export const { updateId, updateToken } = authReducer.actions

export default authReducer.reducer