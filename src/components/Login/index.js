import React, {
	useContext,
	useRef,
	useLayoutEffect,
	useState,
	useEffect,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
	FirebaseContext,
	logIn,
	logOut,
	addOnAuthChange,
	fireDatabase,
	fireStorage,
} from 'shared/Firebase.config';

//style
import './styles.scss';

//icons
import { Fab } from '@material-ui/core';
import { FcGoogle } from 'react-icons/fc';

//theme
import {
	createMuiTheme,
	ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#a0a0a0',
			main: '#ffffff',
			dark: '#d0d0d0',
			contrastText: '#000',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

function Login() {
	const { user, setUser } = useContext(FirebaseContext);
	const logoDivRef = useRef(null);
	const history = useHistory();
	const location = useLocation();

	//window resize
	const [size, setSize] = useState([0, 0]);
	const [fontSize, setFontSize] = useState(10);
	const [loginButtonEx, setLoginButtonEx] = useState(true);
	const [loginButtonSize, setLoginButtonSize] = useState(
		'large'
	);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
			const { fontWidth, fontHeight } = {
				fontWidth: window.innerWidth / 10,
				fontHeight: window.innerHeight / 10,
			};

			let _fontSize =
				fontWidth > fontHeight ? fontHeight : fontWidth;

			if (_fontSize > 100) {
				setLoginButtonEx(true);
				setLoginButtonSize('large');
			} else if (_fontSize > 80) {
				setLoginButtonEx(true);
				setLoginButtonSize('medium');
			} else if (_fontSize > 60) {
				setLoginButtonEx(false);
				setLoginButtonSize('small');
			} else {
				_fontSize = 60;
				setLoginButtonEx(false);
				setLoginButtonSize('small');
			}

			setFontSize(_fontSize);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () =>
			window.removeEventListener('resize', updateSize);
	}, []);
	//

	// useEffect(() => {
	//   logOut(setUser);
	// });

	useEffect(() => {
		if (location.pathname === '/') {
			if (user !== null) {
				history.push('/works');
			}
		}
	}, [user]);

	// const softLogout = () => {
	//   // setImgSrc(null);
	//   // setUploadImage(null);
	//   // setProgress(0);
	//   // setProjects({});
	//   // setWorkUuid(null);
	//   // setProgressBar('');
	//   // setOriginImages([]);
	// };

	const handleLoginClick = (e) => {
		logOut(setUser).then((result) => {
			if (result) {
				logIn().then((_result) => {
					if (_result) {
						//success
						//history.push('/works');
					} else {
						//fail
					}
				});
			}
		});
	};

	return (
		<MuiThemeProvider theme={theme}>
			<div className="login-container">
				<div>
					<div
						className="login-header"
						style={{
							height: size[1] / 2 - fontSize,
						}}></div>
					<div
						ref={logoDivRef}
						className="animate__animated animate__zoomInDown logo">
						<div className="logo-text" style={{ fontSize }}>
							Image Cutter v2
						</div>
						<div className="login-space">
							{loginButtonEx ? (
								<Fab
									onClick={handleLoginClick}
									variant="extended"
									color="primary"
									size={loginButtonSize}>
									<FcGoogle />
									<div className="login-button-font">
										GOOGLE LOGIN
									</div>
								</Fab>
							) : (
								<Fab
									onClick={handleLoginClick}
									color="primary"
									size={loginButtonSize}>
									<FcGoogle />
								</Fab>
							)}
						</div>
					</div>
				</div>
				{size[1] >= 600 ? (
					<a className="login-tail">
						<b>Website testing now</b>
						<br />
						width: {size[0]} + height: {size[1]}
					</a>
				) : undefined}
			</div>
		</MuiThemeProvider>
	);
}

export default Login;
