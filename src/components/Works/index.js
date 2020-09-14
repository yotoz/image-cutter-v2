import React, {
	useContext,
	useEffect,
	useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import WorkCard from 'components/WorkCard';

import './styles.scss';

import {
	FirebaseContext,
	logOut,
	addNewProject,
	addOriginImages,
	getAllProject,
	getAllOriginImageURL,
	fireDatabase,
	fireStorage,
} from 'shared/Firebase.config';

const Works = () => {
	const { user, setUser } = useContext(FirebaseContext);
	const history = useHistory();
	const location = useLocation();

	const [imgSrc, setImgSrc] = useState(null);
	const [uploadImage, setUploadImage] = useState(null);
	const [workUuid, setWorkUuid] = useState(null);
	const [progress, setProgress] = useState(0);
	const [projects, setProjects] = useState({});
	const [originImages, setOriginImages] = useState([]);

	const [progressBar, setProgressBar] = useState('');

	useEffect(() => {
		if (location.pathname === '/works') {
			if (user === null) {
				history.push('/');
			} else {
				fireDatabase();
				fireStorage();
			}
		}
	}, [user]);

	const allLogout = () => {
		logOut(setUser);
	};

	const handleImageFileSelected = (e) => {
		if (e.target.files.length <= 0) {
			setUploadImage(null);
			return;
		}

		e.preventDefault();

		setUploadImage(e.target.files[0]);
	};

	const handleUpload = () => {
		if (
			uploadImage != null &&
			uploadImage.size < 10 * 1024 * 1024
		) {
			const uuid = uuidv4();
			setWorkUuid(uuid);

			addNewProject(user, uuid, uploadImage.name);
			addOriginImages(user, uuid, uploadImage, setProgress);
		} else {
			console.log(`file doesn't selected!`);
		}
	};

	const handleCardClick = (type) => {
		history.push('/app');
		console.log(type);
	};

	useEffect(() => {
		let pb = '';
		for (let i = 0; i < progress / 10; i++) {
			pb = pb + '==';
		}

		if (progress === 0) {
			getAllProject(user, setProjects);
			getAllOriginImageURL(
				user,
				originImages,
				setOriginImages
			);
		}

		setProgressBar(pb);
	}, [progress]);

	return (
		<div className="worksheet">
			<div className="worksheet-top-space"></div>
			<h1>Work Sheet</h1>
			<div>
				<div>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageFileSelected}
					/>
					<button onClick={handleUpload}>upload</button>
				</div>
				<div>
					<h2>Progress : {progress} %</h2>
					<div>{progressBar}</div>
				</div>
				<div>
					{Object.keys(projects).length ? (
						<div className="project-card-frame">
							<WorkCard
								type={'add work sheet'}
								onImageClick={handleCardClick}
							/>
							{Object.keys(projects)
								.reverse()
								.map((key) => {
									const { originImage } = projects[key];
									return (
										<WorkCard
											key={key}
											title={key}
											imgUrl={originImages[key]}
											imgName={originImage}
											onImageClick={handleCardClick}
										/>
									);
								})}
						</div>
					) : (
						<p>LOADING</p>
					)}
				</div>
				<br />
				<button onClick={allLogout}>로그아웃 할꺼임</button>
			</div>
		</div>
	);
};

export default Works;
