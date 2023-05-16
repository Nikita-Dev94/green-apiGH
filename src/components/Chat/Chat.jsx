import React, { useEffect } from 'react';
import s from "./Chat.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateHistory, updateMessageText } from '../../redux/chatReducer';
import { getMessage, deleteNotification, receiveNotification, sendMessage } from '../../app/api';
import Message from '../Message/Message';




const Chat = () => {
const text = useSelector(state=> state.chat.messageText)
const dispatch = useDispatch()
const textRef = React.createRef()
const idValue = useSelector(state => state.auth.idInstance)
const apiTokenValue = useSelector(state => state.auth.apiTokenInstance)
const addressee = useSelector(state => state.chat.addressee)
const history = useSelector(state => state.chat.history)

useEffect(()=> {
	const checkReceive = async ()=> {
		const data = await receiveNotification(idValue,apiTokenValue)
		
		if (data.data !== null) {
			if (data.data.body.typeWebhook.startsWith('incoming') ) {
				dispatch(updateHistory({
					type:'incoming',
					idMessage:data.data.body.idMessage,
					timestamp:data.data.body.timestamp,
					chatId:data.data.body.senderData.chatId,
					senderName:data.data.body.senderData.senderName,
					textMessage: data.data.body.messageData.textMessageData.textMessage
				}))
				await deleteNotification(idValue,apiTokenValue, data.data.receiptId)
			} 
			if (data.data.body.typeWebhook.startsWith('outgoing')) {
				const sendMes = {...data.data}
				const mes = await getMessage(idValue,apiTokenValue,addressee, sendMes.body.idMessage)
				
			dispatch(updateHistory({
				type:mes.type,
				idMessage:mes.idMessage,
				timestamp:mes.timestamp,
				typeMessage:mes.typeMessage,
				chatId:mes.chatId,
				textMessage: mes.textMessage
			}))
			await deleteNotification(idValue,apiTokenValue, data.data.receiptId)
			}
		
		} 
		if (data.status === 200) {
			checkReceive()
		}
		
		
	}
	checkReceive()
},[])

const updateText = ()=> {
	dispatch(updateMessageText(textRef.current.value))

}
const sendNewMessage = async (e)=> {
	e.preventDefault()
	await sendMessage(idValue,apiTokenValue,addressee,text)


	

	dispatch(updateMessageText(''))
}

const messages = history.map(m => <Message time={m.timestamp}  key={m.idMessage} textMessage={m.textMessage} senderName = {m.senderName} type= {m.type} />)
	return (
		<div className={s.chatField}>
			<header className={s.headerChat}>
				Чат с пользователем: +{addressee}
			</header>
			<div className={s.messagesWrappr}>
				<div className={s.messages}>
					{messages.reverse()}
				</div>
			</div>
			<div className={s.sender}>
			<textarea className={s.textarea}ref={textRef} name="message" id="message" value={text} onChange={updateText}></textarea>
			<button className={s.btn} onClick={sendNewMessage}>Отправить сообщение</button>
			</div>
		</div>
	);
}



export default Chat