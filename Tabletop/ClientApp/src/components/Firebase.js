import firebase from 'firebase';

const config = {
//Insert firebase key stuff ;)
};
firebase.initializeApp(config);
//export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
