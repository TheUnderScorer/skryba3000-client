import { SHOW_PROMPT } from '../actions/types';

const InitialState = {
    defaultValue: 'Provide value: ',
    callback:     false,
};

export default function( state = InitialState, action ) {

    switch ( action.type ) {

        case SHOW_PROMPT:

            console.log( action );

            return {
                ...state,
                ...action
            };

        default:
            return state;


    }

}
