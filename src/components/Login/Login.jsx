import React, { useState } from 'react';
import s from "./Login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateId, updateToken } from '../../redux/authReducer';
import { getProfileInfo } from '../../app/api';
import {  useNavigate } from 'react-router-dom';
import { setNumber } from '../../redux/chatReducer';



const Login = () => {
const dispatch = useDispatch()
const idValue = useSelector(state => state.auth.idInstance)
const apiTokenValue = useSelector(state => state.auth.apiTokenInstance)
const id = React.createRef();
const token = React.createRef();
const [errMode, setErr] = useState(false)
const navigate = useNavigate();


const updateIdValue = ()=> {
	dispatch(updateId(id.current.value))
	setErr(false)
}
const updateTokenValue = ()=> {
	dispatch(updateToken(token.current.value))
	setErr(false)
}

const getProfile = async (e)=> {
	e.preventDefault()
	if (idValue.length !== 0 && apiTokenValue.length !== 0) {
		const data = await getProfileInfo(idValue, apiTokenValue)
		const number =  data.wid.replace(/\D/g,'');
		dispatch(setNumber(number))
		navigate('/chat')
	} else {
		setErr(true)
	}
}
	return (
		<div className={s.loginWrapper}>
			<div className={s.wrapper}>
				<h1 className={s.title}>
					Здравствуйте! Добро пожаловать в ChatMe!
					Отправляйте и получайте сообщения, картинки и видео через стабильный шлюз WhatsApp API
				</h1>
				<form className={s.form} action="#">
					<h2 className={s.titleForm}>
						Пожалуйста, введите свои учетные данные из личного кабинета <strong>GREEN API</strong>
					</h2>
					<label htmlFor="id">
						idInstance
						<input ref={id} className={s.input} type="number" name="id" id="IdInstance" value={idValue} onChange={updateIdValue}/>
					</label>
					<label htmlFor="apiToken">
						apiTokenInstance
						<input ref={token} className={s.input} type="text" name="apiToken" id="apiToken" value={apiTokenValue} onChange={updateTokenValue} />
					</label>
					<button onClick={getProfile} className={s.btn}>Войти</button>
					<p className={s.incorrect}>
							{errMode &&
								<p>Вы не ввели данные</p>
							}
						</p>
				</form>
			</div>
		</div>
	);
}



export default Login