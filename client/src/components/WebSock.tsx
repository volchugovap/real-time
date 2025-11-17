import { useRef, useState, type FC } from 'react'

export const WebSock: FC = () => {
	const [messages, setMessages] = useState([])
	const [value, setValue] = useState('')
	const socket = useRef()
	const [connected, setConnected] = useState(false)
	const [userName, setUserName] = useState('')

	const sendMessage = async () => {
		const message = {
			userName,
			message: value,
			id: Date.now(),
			event: 'message',
		}
		socket.current.send(JSON.stringify(message))
		setValue('')
	}

	function connect() {
		socket.current = new WebSocket('ws://localhost:5000')

		socket.current.onopen = () => {
			setConnected(true)
			const message = {
				id: Date.now(),
				userName,
				event: 'connection',
			}

			socket.current.send(JSON.stringify(message))
			console.log('Подключение установлено')
		}

		socket.current.onmessage = event => {
			const message = JSON.parse(event.data)
			setMessages(prev => [message, ...prev])
		}

		socket.current.onclose = () => {
			console.log('Соединение закрыто')
		}

		socket.current.onerror = () => {
			console.log('Произошла ошибка')
		}
	}

	if (!connected) {
		return (
			<div>
				<div>
					<input
						type='text'
						onChange={e => setUserName(e.target.value)}
						value={userName}
						placeholder='Введите имя'
					/>
					<button onClick={connect}> Войти</button>
				</div>
			</div>
		)
	}

	return (
		<div className='center'>
			<div>
				<div className='form'>
					<input
						type='text'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<button onClick={sendMessage}>Отправить</button>
				</div>
				<div className='messages'>
					{messages.map(mess => (
						<div className='message' key={mess.id}>
							{mess.event === 'connection' ? (
								<div>Пользователь {mess.userName} подключился!</div>
							) : (
								<div>
									{mess.userName}: {mess.message}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
