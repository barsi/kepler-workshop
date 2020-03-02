import { combinedUpdaters } from 'kepler.gl/reducers';
import KeplerGlSchema from 'kepler.gl/schemas';
import { processGeojson, processCsvData } from 'kepler.gl/processors';

import {generateHashId} from '../utils/strings';
import actions from '../actions';


export const loadRemoteResourceSuccess = (state, action) => {
    // TODO: replace generate with a different function
    const datasetId = action.options.id || generateHashId(6);
    const { dataUrl } = action.options;
    let processorMethod = processCsvData;
    // TODO: create helper to determine file ext eligibility
    if (dataUrl.includes('.json') || dataUrl.includes('.geojson')) {
        processorMethod = processGeojson;
    }

    const datasets = {
        info: {
            id: datasetId
        },
        data: processorMethod(action.response)
    };

    const config = action.config ?
        KeplerGlSchema.parseSavedConfig(action.config) : null;

    const keplerGlInstance = combinedUpdaters.addDataToMapUpdater(
        state.keplerGl.map, // "map" is the id of your kepler.gl instance
        {
            payload: {
                datasets,
                config
            }
        }
    );

    return {
        ...state,
        app: {
            ...state.app,
            currentSample: action.options,
            isMapLoading: false // we turn of the spinner
        },
        keplerGl: {
            ...state.keplerGl, // in case you keep multiple instances
            map: keplerGlInstance
        }
    };
};

export const composedUpdaters = {
    [actions.constants.LOAD_REMOTE_RESOURCE_SUCCESS]: loadRemoteResourceSuccess
};

