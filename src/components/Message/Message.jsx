import React from 'react';
import s from "./Message.module.css";





const Message = (props) => {
	const min = new Date(props.time * 1000).getMinutes().toString()
const date = (new Date(props.time * 1000).getHours() + ':' + (min.length === 1 ? '0'+min : min) )
	return (
		<p className={props.type === 'incoming' ? s.incoming : s.outgoing}>
			{props.textMessage}
			<span className={s.senderName}>{props.senderName}</span>
			<span className={s.date}>{date}</span>
		</p>
	);
}



export default Message