import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    siginInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA2V7V4xttxa454dxMSbr1SYABIyBP37O8",
    authDomain: "crwn-clothing-db-e02c3.firebaseapp.com",
    projectId: "crwn-clothing-db-e02c3",
    storageBucket: "crwn-clothing-db-e02c3.appspot.com",
    messagingSenderId: "70068387339",
    appId: "1:70068387339:web:a1dd1a161e74ca7f66910e"
  };

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}