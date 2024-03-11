// reducer.ts
import { DataAction } from './actions';
import { Syj } from '../types';

interface DataState {
    loading: boolean;
    syj: Syj | null;
    cc: number[][] | null;
    error: Error | null;
}

const initialState: DataState = {
    loading: false,
    syj: null,
    cc: null,
    error: null,
};

const dataReducer = (state: DataState = initialState, action: DataAction): DataState => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_DATA_SUCCESS':
            return { ...state, loading: false, syj: action.payload.syj, cc: action.payload.cc };
        case 'FETCH_DATA_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default dataReducer;
