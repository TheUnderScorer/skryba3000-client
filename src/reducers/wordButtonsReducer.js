import { CLICK_WORD } from '../actions/types';

const InitialState = [];

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case CLICK_WORD:

            let { wordIndex } = action;

            if ( state.indexOf( wordIndex ) > -1 ) {
                state.splice( wordIndex, 1 );
            } else {
                state.push( wordIndex );
            }

            return [ ...state ];

        default:
            return state;

    }

}
