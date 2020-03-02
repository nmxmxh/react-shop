import ShopActionTypes from './shops.types';

import { firestore, convertCollectiondSnapshotToMap } from '../../firebase/firebase.utils';



export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE, 
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectiondSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})