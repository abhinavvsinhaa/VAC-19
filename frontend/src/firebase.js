import firebase from 'firebase';

const config = { 
    apiKey: "AIzaSyBoOF-KilXXpK5CNTAXHfv-_ihO_9aUTK8",
    authDomain: "vaccine-drive-29a86.firebaseapp.com",
    projectId: "vaccine-drive-29a86",
    storageBucket: "vaccine-drive-29a86.appspot.com",
    messagingSenderId: "95173242991",
    appId: "1:95173242991:web:eb8a9e23675d17b9179d9a"
}

firebase.initializeApp(config);

export default firebase;

