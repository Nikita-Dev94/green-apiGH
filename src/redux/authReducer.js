
import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
	name: 'auth',
	initialState: {
		idInstance: '1101821136',
		apiTokenInstance: '20ad6cba231d4a82943a75e1b8b7e40f000322de8773454c92'
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