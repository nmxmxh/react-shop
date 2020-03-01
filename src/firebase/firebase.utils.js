import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB_b5QMk0hZ-PCK01PmpHZ6YHiFSEJ1dgQ",
    authDomain: "mn-react-shop.firebaseapp.com",
    databaseURL: "https://mn-react-shop.firebaseio.com",
    projectId: "mn-react-shop",
    storageBucket: "mn-react-shop.appspot.com",
    messagingSenderId: "448831565492",
    appId: "1:448831565492:web:64e6236262dc6217d5b1e1",
    measurementId: "G-KZ9NYT94C5"
}

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName,email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit()
};

export const convertCollectiondSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map( doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({  prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider).then(function(authdata) {
    console.log(authdata)
}).catch(function(error) {
    console.log(error)
})

export default firebase;

