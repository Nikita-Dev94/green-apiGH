import axios from "axios"



const pathApi = `https://api.green-api.com/waInstance`
// Получение информации об аккаунте
export const getProfileInfo = (id, token) => {
	return axios
		.get(`${pathApi}${id}/GetSettings/${token}`,
		)
		.then(res => res.data)
}
export const receiveNotification = (id, token) => {
	return axios
		.get(`${pathApi}${id}/ReceiveNotification/${token}`,
		)

}
export const deleteNotification = (id, token, recId) => {
	return axios
		.delete(`${pathApi}${id}/DeleteNotification/${token}/${recId}`,
		)
		.then(res => res.data)
}
export const sendMessage = (id, token, num, mes) => {
	return axios
		.post(`${pathApi}${id}/SendMessage/${token}`, 
		{
			"chatId": `${num}@c.us`,
			"message": mes,
		}
		)
}
export const getChatHistory = (id, token, num, count=10) => {
	return axios
		.post(`${pathApi}${id}/GetChatHistory/${token}`, 
		{
			"chatId": `${num}@c.us`,
			"count": count,
		}
		)
		.then(res => res.data)
}
export const getMessage = (id, token, num, mes) => {
	return axios
		.post(`${pathApi}${id}/getMessage/${token}`, 
		{
			"chatId": `${num}@c.us`,
			"idMessage": mes
		}
		)
		.then(res => res.data)
}