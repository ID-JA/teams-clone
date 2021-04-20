import { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';
import RingLoader from 'react-spinners/PropagateLoader';

const projectID = '8d2bc637-34d8-4df1-b424-26b2448eae7c';

const App = () => {
	const [isLoading, setIsLloading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLloading(false);
		}, 8000);
	}, []);

	if (!localStorage.getItem('username')) return <LoginForm />;

	return (
		<>
			{isLoading ? (
				<div
					style={{
						height: '100vh',
						width: '100vw',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<RingLoader color='#9013FE' />
				</div>
			) : (
				<ChatEngine
					height='100vh'
					projectID={projectID}
					userName={localStorage.getItem('username')}
					userSecret={localStorage.getItem('password')}
					renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
					onNewMessage={() =>
						new Audio(
							'https://chat-engine-assets.s3.amazonaws.com/click.mp3'
						).play()
					}
				/>
			)}
		</>
	);
};

// infinite scroll, logout, more customizations...

export default App;
