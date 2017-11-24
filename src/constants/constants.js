import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBwwF-bdcMlVx0e_3_dIyNzjXd2dXJEYjQ",
   authDomain: "stay-a10d5.firebaseapp.com",
   databaseURL: "https://stay-a10d5.firebaseio.com",
   projectId: "stay-a10d5",
   storageBucket: "stay-a10d5.appspot.com",
   messagingSenderId: "665169785880"
  };
  firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseRef = firebase.database();
export const firebaseAuth = firebase.auth;
export const firebaseStorage = firebase.storage();
