import { SET_WORD_INPUT_VALUE } from './types';

export const setWordInputValue = value => dispatch => dispatch( {
    type: SET_WORD_INPUT_VALUE,
    value
} );
