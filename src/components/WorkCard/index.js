import React from 'react';

import './styles.scss';

import plus from './resources/plus.png';

const WorkCard = ({
	type,
	title,
	imgUrl,
	imgName,
	onImageClick,
}) => {
	return (
		<div className="work-card">
			<div className="work-card-container">
				<h2 className="work-card-title">
					{type === undefined ? title : 'Add WorkSheet'}
				</h2>
				<hr className="work-card-split-line" />
				<div className="work-card-image-container">
					<div
						className="work-card-image"
						style={
							type === undefined
								? {
										backgroundImage: `url(${imgUrl})`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										backgroundSize: 'cover',
								  }
								: {
										backgroundImage: `url(${plus})`,
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										backgroundSize: 'cover',
								  }
						}
						onClick={() => {
							onImageClick(
								type === undefined ? 'modify' : 'add'
							);
						}}></div>
				</div>
				<p>
					{type === undefined
						? `Origin Image: ${imgName}`
						: `Click this card to add worksheet`}
				</p>
			</div>
		</div>
	);
};

export default WorkCard;
