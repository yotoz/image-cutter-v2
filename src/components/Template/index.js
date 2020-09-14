import React from 'react';
import Navbar from 'components/Navbar';

const Template = ({ children }) => {
	return (
		<div style={{ display: 'flex' }}>
			<Navbar />
			<div style={{ width: '100%' }}>{children}</div>
		</div>
	);
};

export default Template;
