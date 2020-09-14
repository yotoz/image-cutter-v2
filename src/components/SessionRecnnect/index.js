import React, { useEffect, useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { FirebaseContext } from 'shared/Firebase.config';

import './styles.scss';

const SessionReconnect = () => {
	const { user, setUser } = useContext(FirebaseContext);
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/reconnect') {
			if (user !== null) {
				history.goBack();
			}
		}
	}, [user]);

	const handleGoHomeButton = () => {
		history.replace('/');
	};

	return (
		<div className={`reconnect-container`}>
			<h1>Lost Connection</h1>
			<button onClick={handleGoHomeButton}>Go Home</button>
		</div>
	);
};

export default SessionReconnect;
