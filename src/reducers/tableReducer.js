import { EDIT_TABLE_ROW, SWITCH_TABLE_LOADER } from '../actions/types';

const InitialState = {
    editedIndex: false,
    editedLang:  null,
    isLoading:   false,
};

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case EDIT_TABLE_ROW:

            let { editedIndex, editedLang } = action;

            return {
                ...state,
                editedIndex,
                editedLang
            };

        case SWITCH_TABLE_LOADER:

            let { isLoading } = action;

            return {
                ...state,
                isLoading
            };


        default:
            return state;


    }

}
