
import { createSlice } from '@reduxjs/toolkit';

export const chatReducer = createSlice({
	name: 'chat',
	initialState: {
	telNumber: null,
	addressee: '79939617020',
	messageText: '',
	history: []
	},
	reducers: {
		setNumber: (state, action) => {
			state.telNumber = action.payload
		},
		updateAddresseeNum: (state, action) => {
			state.addressee = action.payload
		},
		updateMessageText: (state, action) => {
			state.messageText = action.payload
		},
		setHistory: (state, action) => {
			state.history = action.payload
		},
		updateHistory: (state, action) => {
			state.history = [action.payload,...state.history]
		},

	}
})

export const { setNumber, updateAddresseeNum, updateMessageText, setHistory, updateHistory } = chatReducer.actions

export default chatReducer.reducer