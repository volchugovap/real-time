import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WebSock } from './components/WebSock.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* <LongPulling /> */}
		{/* <EventSourcing /> */}
		<WebSock />
	</StrictMode>
)
