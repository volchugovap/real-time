import { useEffect, useState, type FC } from 'react'
import axios from 'axios'

export const LongPulling: FC = () => {
	const [messages, setMessages] = useState<string[]>([])
	const [value, setValue] = useState('')

	useEffect(() => {
		subscribe()
	}, [])

	const subscribe = async () => {
		try {
			const { data } = await axios.get('http://localhost:5000/get-messages')
			setMessages(prev => [data, ...prev])
			await subscribe()
		} catch (e) {
			setTimeout(() => subscribe(), 500)
		}
	}

	const sendMessage = async () => {
		await axios.post('http://localhost:5000/new-messages', {
			message: value,
			id: Date.now(),
		})
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
							{mess.message}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
