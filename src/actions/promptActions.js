import { SHOW_PROMPT } from './types';

export const showPrompt = ( { defaultValue = '', callback, message } ) => dispatch => {

    dispatch( {
        type: SHOW_PROMPT,
        defaultValue,
        callback,
        message
    } )

};
