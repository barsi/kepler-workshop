import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { EXPORT_MAP_FORMATS } from 'kepler.gl/constants';

import keplerGlReducer, { uiStateUpdaters } from 'kepler.gl/reducers';
import {AUTH_TOKENS} from '../constants';
import {composedUpdaters} from './map-data';


// INITIAL_APP_STATE
const initialAppState = {
    appName: 'kepler-workshop',
    loaded: false,
    loadingMethod: 'sample',
    // currentOption: DEFAULT_LOADING_METHOD.options[0],
    previousMethod: null,
    sampleMaps: [], // this is used to store sample maps fetch from a remote json file
    isMapLoading: false, // determine whether we are loading a sample map,
    error: null, // contains error when loading/retrieving data/configuration
    // {
    //   status: null,
    //   message: null
    // }
    // eventually we may have an async process to fetch these from a remote location
    // featureFlags: DEFAULT_FEATURE_FLAGS
};

// App reducer
export const appReducer = handleActions({
    // [INIT]: (state) => ({
    //     ...state,
    //     loaded: true
    // }),
    // [SET_LOADING_METHOD]: (state, action) => ({
    //     ...state,
    //     previousMethod: state.loadingMethod,
    //     loadingMethod: LOADING_METHODS.find(({ id }) => id === action.method),
    //     error: null
    // }),
    // [LOAD_MAP_SAMPLE_FILE]: (state, action) => ({
    //     ...state,
    //     sampleMaps: action.samples
    // }),
    // [SET_SAMPLE_LOADING_STATUS]: (state, action) => ({
    //     ...state,
    //     isMapLoading: action.isMapLoading
    // })
}, initialAppState);

const { DEFAULT_EXPORT_MAP } = uiStateUpdaters;

// combine app reducer and keplerGl reducer
// to mimic the reducer state of kepler.gl website
const workshopReducer = combineReducers({
    // mount keplerGl reducer
    keplerGl: keplerGlReducer.initialState({
        // In order to provide single file export functionality
        // we are going to set the mapbox access token to be used
        // in the exported file
        uiState: {
            exportMap: {
                ...DEFAULT_EXPORT_MAP,
                [EXPORT_MAP_FORMATS.HTML]: {
                    ...DEFAULT_EXPORT_MAP[[EXPORT_MAP_FORMATS.HTML]],
                    exportMapboxAccessToken: AUTH_TOKENS.EXPORT_MAPBOX_TOKEN
                }
            }
        }
    }),
    app: appReducer
});


const composedReducer = (state, action) => {
    if (composedUpdaters[action.type]) {
        return composedUpdaters[action.type](state, action);
    }
    return workshopReducer(state, action);
};

export default composedReducer;
