import { EDIT_TABLE_ROW, SWITCH_TABLE_LOADER } from './types';

export const editTableRow = ( { editedIndex = false, editedLang = '' } ) => dispatch => {

    dispatch( {
        type: EDIT_TABLE_ROW,
        editedIndex,
        editedLang
    } )

};

export const toggleLoader = ( isLoading = false ) => dispatch => dispatch( {
    type: SWITCH_TABLE_LOADER,
    isLoading
} );
