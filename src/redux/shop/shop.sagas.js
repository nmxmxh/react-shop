import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectiondSnapshotToMap } from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shops.actions'

import ShopActionTypes from './shops.types';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();
    
        const collectionsMap = yield call(convertCollectiondSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

    // collectionRef.get().then(snapshot => {
    //     const collectionsMap = convertCollectiondSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap))
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
} 