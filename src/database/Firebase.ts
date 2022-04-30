import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUpHYaKACnwIqUYa-qvKnjV2qZgUBpXIE",
    authDomain: "todolist-7ba06.firebaseapp.com",
    projectId: "todolist-7ba06",
    storageBucket: "todolist-7ba06.appspot.com",
    messagingSenderId: "881509386641",
    appId: "1:881509386641:web:86f4f8960cd15c94b13230"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
