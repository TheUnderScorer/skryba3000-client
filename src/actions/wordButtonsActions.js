import { CLICK_WORD } from './types';

export const clickWord = wordIndex => dispatch => {

    dispatch( {
        type: CLICK_WORD,
        wordIndex
    } )

};
