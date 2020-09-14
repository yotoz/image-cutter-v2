import React, {
	useState,
	useEffect,
	useContext,
	useCallback,
	createContext,
} from 'react';
import './App.scss';

import Works from 'components/Works';
import SessionReconnect from 'components/SessionRecnnect';
import MainPage from 'components/MainPage';
import Login from 'components/Login';
import Navbar from 'components/Navbar';

import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';

import {
	logOut,
	FirebaseContext,
	addOnAuthChange,
	logIn,
	addNewProject,
	fireDatabase,
	fireStorage,
	addOriginImages,
	getAllProject,
	getAllOriginImageURL,
} from 'shared/Firebase.config';
import Template from 'components/Template';

// import { v4 as uuidv4 } from 'uuid';

function App() {
	const { user, setUser } = useContext(FirebaseContext);

	useEffect(() => {
		addOnAuthChange(setUser);
	});

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/works">
					<Template>
						<Works />
					</Template>
				</Route>
				<Route path="/reconnect">
					<SessionReconnect />
				</Route>
				<Route path="/app">
					<Template>
						<MainPage />
					</Template>
				</Route>
				<Route>
					<Login />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;

// const { user, setUser } = useContext(FirebaseContext);
//   const [imgSrc, setImgSrc] = useState(null);
//   const [uploadImage, setUploadImage] = useState(null);
//   const [workUuid, setWorkUuid] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [projects, setProjects] = useState({});
//   const [originImages, setOriginImages] = useState([]);

//   const [progressBar, setProgressBar] = useState({});

//   useEffect(() => {
//     if (user != null) {
//       fireDatabase();
//       fireStorage();

//       getAllProject(user, setProjects);
//       getAllOriginImageURL(
//         user,
//         originImages,
//         setOriginImages,
//       );
//     } else {
//       //로그인 상태 없음, 혹은 로그아웃
//       //allLogout();
//       softLogout();
//     }
//   }, [user]);

//   const softLogout = () => {
//     setImgSrc(null);
//     setUploadImage(null);
//     setProgress(0);
//     setProjects({});
//     setWorkUuid(null);
//     setProgressBar('');
//     setOriginImages([]);
//   };

//   const allLogout = () => {
//     logOut(setUser);
//     setImgSrc(null);
//     setUploadImage(null);
//     setProgress(0);
//     setProjects({});
//     setWorkUuid(null);
//     setProgressBar('');
//     setOriginImages([]);
//   };

//   useEffect(() => {
//     return () => {};
//   }, [uploadImage]);

//   const handleImageFileSelected = (e) => {
//     if (e.target.files.length <= 0) {
//       setUploadImage(null);
//       return;
//     }

//     e.preventDefault();

//     setUploadImage(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (
//       uploadImage != null &&
//       uploadImage.size < 10 * 1024 * 1024
//     ) {
//       const uuid = uuidv4();
//       setWorkUuid(uuid);

//       addNewProject(user, uuid, uploadImage.name);
//       addOriginImages(user, uuid, uploadImage, setProgress);
//     } else {
//       console.log(`file doesn't selected!`);
//     }
//   };

//   useEffect(() => {
//     let pb = '';
//     for (let i = 0; i < progress / 10; i++) {
//       pb = pb + '==';
//     }

//     if (progress === 0) {
//       getAllProject(user, setProjects);
//       getAllOriginImageURL(
//         user,
//         originImages,
//         setOriginImages,
//       );
//     }

//     setProgressBar(pb);
//   }, [progress]);

{
	/* <h1>My Works</h1>
      {user !== null ? (
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
              <div className="project-card-container">
                {Object.keys(projects).map((key) => {
                  const { originImage } = projects[key];
                  return (
                    <div
                      className="project-card"
                      onMouseEnter={(e) => {
                        console.log('enter', e.target);
                      }}
                      onMouseOut={(e) => {
                        console.log('out', e.target);
                      }}
                      key={key}
                      style={{
                        width:
                          Object.keys(projects).length === 1
                            ? '100%'
                            : '50%',
                      }}
                    >
                      <div
                        style={{
                          width: '99%',
                          height: '1000px',
                          border: '1px solid grey',
                          borderRadius: '8px',
                          marginTop: '10px',
                          marginLeft: '10px',
                          marginRight: '5px',
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        <h2>{key}</h2>
                        <hr
                          style={{
                            width: '85%',
                            marginTop: '-10px',
                            marginBottom: '15px',
                          }}
                        />
                        <div
                          style={{
                            width: '100%',
                            height: '850px',
                          }}
                        >
                          <div
                            style={{
                              overflowY: 'hidden',
                              width: '100%',
                              height: '850px',
                              borderRadius: '4%',
                            }}
                          >
                            <img
                              id={key}
                              alt={originImage}
                              style={{
                                width: '95%',
                              }}
                              src={originImages[key]}
                            />
                          </div>
                        </div>
                        <p>originImage: {originImage}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>LOADING</p>
            )}
            <br />
            <button onClick={allLogout}>
              로그아웃 할꺼임
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              logIn();
            }}
          >
            구글 로그인 할꺼임 ㅎㅎ
          </button>
          <p className="loading">wait login</p>
          <button onClick={allLogout}>
            로그아웃 할꺼임
          </button>
        </div>
      )} */
}
