import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({  
    apiKey: "AIzaSyCN4QQkbeNTjByR9SLqRkA15UN629Kt5hw",
    authDomain: "yanirreactporject.firebaseapp.com",
    projectId: "yanirreactporject",
    storageBucket: "yanirreactporject.appspot.com",
    messagingSenderId: "678498379439",
    appId: "1:678498379439:web:c6f60d6ac6a02aa372165a"
})
export const auth = app.auth()
export const db = firebase.firestore()
export default app