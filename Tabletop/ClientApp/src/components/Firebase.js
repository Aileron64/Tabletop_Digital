import firebase from 'firebase';

const config = {
    //Insert firebase key stuff ;)
    apiKey: "AIzaSyAqQ_fXL3BjINZCxJjvU33_cSpMdfB6hDk",
    authDomain: "tabletopd-c3011.firebaseapp.com",
    databaseURL: "https://tabletopd-c3011.firebaseio.com",
    projectId: "tabletopd-c3011",
    storageBucket: "tabletopd-c3011.appspot.com",
    messagingSenderId: "1065963904276",
    appId: "1:1065963904276:web:85f6c5fbb577aa20573601",
    measurementId: "G-C86YS310KS"
};
firebase.initializeApp(config);
//export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;