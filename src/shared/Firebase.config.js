import React, { createContext, useState } from 'react';
import * as firebase from 'firebase';

let database = null;
let storage = null;

const firebaseConfig = {
  apiKey: 'AIzaSyCuHEJxuf5yBtITYPyTLDpT3ojUNbsMMv4',
  authDomain: 'image-cutter-v2.firebaseapp.com',
  databaseURL: 'https://image-cutter-v2.firebaseio.com',
  projectId: 'image-cutter-v2',
  storageBucket: 'image-cutter-v2.appspot.com',
  messagingSenderId: '510508719126',
  appId: '1:510508719126:web:3a3799115d2254d944e937',
  measurementId: 'G-R6LPMQYVRD',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase
  //   .auth()
  //   .setPersistence(firebase.auth.Auth.Persistence.NONE);
}

export const fireDatabase = () => {
  database = firebase.database();
};

export const fireStorage = () => {
  storage = firebase.storage();
};

export const getAllOriginImageURL = async (
  user,
  originImages,
  setOriginImages,
) => {
  try {
    const imgRef = await storage.ref(
      `/users/${user.uid}/works`,
    );

    const imageArray = {};

    const projects = await imgRef.listAll();
    for (let i = 0; i < projects.prefixes.length; i++) {
      const originRef = await projects.prefixes[
        i
      ].listAll();

      for (let j = 0; j < originRef.prefixes.length; j++) {
        const originImageRef = await originRef.prefixes[
          j
        ].listAll();

        if (originImageRef.items.length > 0) {
          const url = await originImageRef.items[0].getDownloadURL();

          imageArray[projects.prefixes[i].name] = url;
        }
      }
    }

    setOriginImages(imageArray);
  } catch (error) {
    console.log(error);
  }

  // const imageRef = await storageRef.child('images');
  // fileName = 'girl.jpg';
  // const fileRef = await imageRef
  //   .child(fileName)
  //   .getDownloadURL();

  // return fileRef;
};

const getFireDB = () => {
  return database.ref('/').once('value');
};

export const setMemo = async (title, desc) => {
  const res = await getFireDB();

  database.ref('/memos/' + res.val().memos.length).set({
    desc,
    title,
  });
};

const getProjectDatabase = async (
  user,
  projectUid = null,
) => {
  const db = await database
    .ref('/users/' + user.uid + '/works/' + projectUid)
    .once('value');

  return db;
};

export const addNewProject = async (
  user,
  uuid,
  originImage,
) => {
  try {
    const resultCheckDatabase = await getProjectDatabase(
      user,
      uuid,
    );

    const time = await firebase.database.ServerValue
      .TIMESTAMP;

    if (!resultCheckDatabase.exists()) {
      database.ref('/users/' + user.uid + '/works').update({
        [uuid]: {
          originImage,
          lastUpdate: time,
        },
      });
    } else {
      //디비 이미 있음
    }
  } catch (error) {
    console.log(error);
  }
};

export const addOriginImages = async (
  user,
  uuid,
  image,
  setProgress,
) => {
  try {
    const resultStorage = storage
      .ref(
        `users/${user.uid}/works/${uuid}/originImage/${image.name}`,
      )
      .put(image);
    //기본적으로 덮어쓰기임

    resultStorage.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred /
            snapshot.totalBytes) *
            100,
        );

        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        //이건 콜백임
        setProgress(0);
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllProject = async (user, setProjects) => {
  try {
    const snapshot = await database
      .ref('/users/' + user.uid + '/works')
      .once('value');

    if (snapshot.exists()) {
      setProjects(snapshot.val());
    } else {
      throw new Error(`data doen't exists!`);
    }
  } catch (error) {
    setProjects({});
    console.log(error);
  }
};

//////////////log in
export const addOnAuthChange = (setUser) => {
  firebase.auth().onAuthStateChanged((connectedUser) => {
    if (connectedUser != null) {
      setUser(connectedUser);
    }
  });
};

export const logIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope(
    'https://www.googleapis.com/auth/contacts.readonly',
  );
  //firebase.auth().languageCode = 'pt';
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  try {
    await firebase.auth().signInWithPopup(provider);

    return true;
  } catch (error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...
    return false;
  }
};
////////////////////

//////////////log out
export const logOut = async (setUser) => {
  try {
    await firebase.auth().signOut();
    setUser(null);
    return true;
  } catch (error) {
    return false;
  }
};
/////////////////////

/////////////////context
export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const context = {
    user,
    setUser,
  };

  return (
    <FirebaseContext.Provider value={context}>
      {children}
    </FirebaseContext.Provider>
  );
};

////////////////////////
