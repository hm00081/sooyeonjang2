import { Syj, NodeCycle } from '../types';

interface FetchDataRequestAction {
    type: 'FETCH_DATA_REQUEST';
}

interface FetchDataSuccessAction {
    type: 'FETCH_DATA_SUCCESS';
    payload: { syj: Syj; cc: number[][] };
}

interface FetchDataFailureAction {
    type: 'FETCH_DATA_FAILURE';
    payload: Error;
}

export type DataAction = FetchDataRequestAction | FetchDataSuccessAction | FetchDataFailureAction;

export const fetchDataRequest = (): FetchDataRequestAction => ({
    type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = (data: { syj: Syj; cc: number[][] }): FetchDataSuccessAction => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataFailure = (error: Error): FetchDataFailureAction => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
});
