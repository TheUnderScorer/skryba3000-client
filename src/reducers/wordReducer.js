import { ADD_WORD, REMOVE_WORD, EDIT_WORD, CLEAR_WORDS } from '../actions/types';

const InitialState = localStorage.getItem( 'words' ) ? JSON.parse(
    localStorage.getItem( 'words' )
) : [];

export default function( state = InitialState, action ) {

    let { index } = action;

    switch ( action.type ) {

        case ADD_WORD:

            state.push( action.data );
            localStorage.setItem( 'words', JSON.stringify( state ) );

            return [ ...state ];

        case REMOVE_WORD:

            state.splice( index, 1 );
            localStorage.setItem( 'words', JSON.stringify( state ) );

            return [ ...state ];

        case EDIT_WORD:

            let { word } = action;

            let prevWord = state[ index ];

            state[ index ] = {
                ...prevWord,
                ...word
            };

            localStorage.setItem( 'words', JSON.stringify( state ) );

            return [ ...state ];

        case CLEAR_WORDS:

            localStorage.setItem( 'words', JSON.stringify( [] ) );
            return [];


        default:
            return state;

    }

}
