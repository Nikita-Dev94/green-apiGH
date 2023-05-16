import React from 'react';
import s from "./CreateChat.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setHistory, updateAddresseeNum } from '../../redux/chatReducer';
import { useNavigate } from 'react-router-dom';
import { getChatHistory } from '../../app/api';




const CreateChat = () => {
const tel = useSelector(state => state.chat.telNumber)
const adressTel = useSelector(state => state.chat.addressee)
const idValue = useSelector(state => state.auth.idInstance)
const apiTokenValue = useSelector(state => state.auth.apiTokenInstance)
const addressee = useSelector(state => state.chat.addressee)
const dispatch = useDispatch()
const adTel = React.createRef()
const navigate = useNavigate();

const updateAddressTel = ()=> {
	dispatch(updateAddresseeNum(adTel.current.value))
}

const createNewChat = (e)=> {
	e.preventDefault()
	if (adressTel.length >= 10) {
		const getHistory = async ()=> {
			const data = await getChatHistory(idValue,apiTokenValue,addressee,5)
			dispatch(setHistory(data))
		}
		getHistory()
		navigate(`/chat/${adressTel}`)
	}
}

	return (
		<div className={s.chat}>
				<h2 className={s.chatTitle}>Ваш номер: +{tel}</h2>
				<form action="#">
					<h3 className={s.formTitle}>Что бы начать чат, введите номер телефона пользователя в <a href="https://green-api.com/docs/faq/features-of-sending-and-receiving-messages-from-different-countries/" target="_blank" rel="noopener noreferrer">международном формате,</a>  например: 71234567890</h3>
					<input className={s.input} ref={adTel} type="number" name="tel" id="tel" value={adressTel} onChange={updateAddressTel}/>
					<button className={s.btn} onClick={createNewChat}>Создать чат</button>
				</form>
		</div>
	);
}



export default CreateChat