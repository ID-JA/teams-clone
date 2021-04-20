import React from 'react';
import MyMessage from './MyMessage';
import ThereMessage from './ThereMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
	const { chats, activeChat, userName, messages } = props;

	const chat = chats && chats[activeChat];

	const renderReadReceipts = (message, isMyMessage) =>
		chat.people.map(
			(person, index) =>
				person.last_read === message.id && (
					<div
						key={`read_${index}`}
						className='read-receipt'
						style={{
							float: isMyMessage ? 'right' : 'left',
							backgroundImage:
								person.person.avatar && `url(${person.person.avatar})`,
						}}
					/>
				)
		);

	const renderMessages = () => {
		const keys = Object.keys(messages);

		return keys.map((key, index) => {
			const message = messages[key];
			const lastMessageKey = index === 0 ? null : keys[index - 1];
			const isMyMessage = userName === message.sender.username;
			const handleLogOut = () => {
				localStorage.clear();

				window.location.reload();
			};
			return (
				<div key={`msg_${index}`} style={{ width: '100%' }}>
					<button
						onClick={handleLogOut}
						style={{
							zIndex: '90000',
							position: 'fixed',
							bottom: '2rem',
							right: '2rem',
						}}
						className='button-logOut'
					>
						Log Out
					</button>
					<div className='message-block'>
						{isMyMessage ? (
							<MyMessage message={message} />
						) : (
							<ThereMessage
								message={message}
								lastMessage={messages[lastMessageKey]}
							/>
						)}
					</div>
					<div
						className='read-receipts'
						style={{
							marginRight: isMyMessage ? '18px' : '0px',
							marginLeft: isMyMessage ? '0px' : '68px',
						}}
					>
						{renderReadReceipts(message, isMyMessage)}
					</div>
				</div>
			);
		});
	};

	if (!chat) return <div />;

	return (
		<div className='chat-feed'>
			<div className='chat-title-container'>
				<div className='chat-title'>{chat?.title}</div>
				<div className='chat-subtitle'>
					{chat.people.map((person) => ` ${person.person.username}`)}
				</div>
			</div>
			{renderMessages()}
			<div style={{ height: '100px' }} />
			<div className='message-form-container'>
				<MessageForm {...props} chatId={activeChat} />
			</div>
		</div>
	);
};

export default ChatFeed;
