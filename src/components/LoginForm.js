import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const projectID = '8d2bc637-34d8-4df1-b424-26b2448eae7c';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const authObject = {
			'Project-ID': projectID,
			'User-Name': username,
			'User-Secret': password,
		};

		try {
			await axios.get('https://api.chatengine.io/chats', {
				headers: authObject,
			});

			localStorage.setItem('username', username);
			localStorage.setItem('password', password);

			window.location.reload();
		} catch (err) {
			swal({
				icon: 'error',
				text: 'incorrect UserName or Password Please Try Again',
			});
		}
	};

	return (
		<div className='wrapper'>
			<div className='form'>
				<h1 className='title'>Teams Clone</h1>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='input'
						placeholder='Username'
						required
					/>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='input'
						placeholder='Password'
						required
					/>
					<div align='center'>
						<button type='submit' className='button'>
							<span>Start chatting</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
