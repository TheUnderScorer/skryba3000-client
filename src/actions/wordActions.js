import { ADD_WORD, REMOVE_WORD, EDIT_WORD, CLEAR_WORDS } from './types';

export const addWord = ( { english, polish, pronounciation = false, multiple = false } ) => dispatch => {

    dispatch( {
        type: ADD_WORD,
        data: { english, polish, pronounciation, multiple }
    } )

};

export const removeWord = index => dispatch => {

    dispatch( {
        type: REMOVE_WORD,
        index
    } )

};

export const editWord = ( index, word ) => dispatch => {

    dispatch( {
        type: EDIT_WORD,
        index,
        word
    } )

};

export const clearWords = () => dispatch => dispatch( {
    type: CLEAR_WORDS
} );
